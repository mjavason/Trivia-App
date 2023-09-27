import { Request, Response } from 'express';
import geoip from 'geoip-lite';
import { triviaService } from '../services';
import { SuccessResponse, InternalErrorResponse, NotFoundResponse } from '../helpers/response';
import { MESSAGES } from '../constants';
import ApiService from '../services/api.service';
import IIpify from '../interfaces/ipify.interface';
import logger from '../helpers/logger';

async function calculateLevenshteinEditDistance(str1: string, str2: string) {
  const m: number = str1.length;
  const n: number = str2.length;
  const dp: number[][] = [];

  for (let i: number = 0; i <= m; i++) {
    dp[i] = [];
    for (let j: number = 0; j <= n; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}

const ipifyAPI = new ApiService('https://api.ipify.org?format=json');

class Controller {
  async create(req: Request, res: Response) {
    const data = await triviaService.create(req.body);

    if (!data) return InternalErrorResponse(res);

    return SuccessResponse(res, data);
  }

  async getOne(req: Request, res: Response) {
    try {
      // Fetch the user's IP from ipify api
      const userIp = await ipifyAPI.get<IIpify>('');

      if (!userIp) return InternalErrorResponse(res, 'Unable to fetch user IP from Ipify');

      // console.log(userIp.ip);

      // Use geoip-lite to determine the user's country based on their IP
      const geo = await geoip.lookup(userIp.ip);

      logger.info(geo);

      if (!geo || !geo.country) {
        return NotFoundResponse(res, 'Country not found for your IP');
      }

      // Use the user's country to query a random trivia question
      const trivia = await triviaService.findOneRandom({ country: geo.country });

      if (!trivia) {
        return NotFoundResponse(res, 'Trivia not found for your country');
      }

      return SuccessResponse(res, trivia);
    } catch (error) {
      // Handle errors here
      console.error(error);
      return InternalErrorResponse(res);
    }
  }

  async answerOne(req: Request, res: Response) {
    const triviaId = req.body.id;
    const providedAnswer = req.body.answer;
    const data = await triviaService.findOne({ _id: triviaId });

    if (!data) return NotFoundResponse(res);

    const correctAnswer = data.correctAnswer;
    const maxEditDistance = 5; // You can adjust this threshold as needed

    // Calculate the edit distance between the provided answer and the correct answer
    const editDistance = await calculateLevenshteinEditDistance(providedAnswer, correctAnswer);

    // If the edit distance is within the threshold, consider the answer correct
    if (editDistance <= maxEditDistance) {
      return SuccessResponse(
        res,
        data,
        `Correct! The answer is ${data.correctAnswer} You just earned 10 points to your profile`,
      );
    }

    return SuccessResponse(res, data);
  }

  async getAll(req: Request, res: Response) {
    let pagination = parseInt(req.params.pagination);
    if (!pagination) pagination = 1;
    const data = await triviaService.getAll(pagination);

    if (!data) return InternalErrorResponse(res);
    if (data.length === 0) return NotFoundResponse(res);

    return SuccessResponse(res, data);
  }

  async find(req: Request, res: Response) {
    const data = await triviaService.find(req.query);

    if (!data) return InternalErrorResponse(res);
    if (data.length === 0) return NotFoundResponse(res);

    return SuccessResponse(res, data);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = await triviaService.update({ _id: id }, req.body);

    if (!data) return NotFoundResponse(res);

    return SuccessResponse(res, data, MESSAGES.UPDATED);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const data = await triviaService.softDelete({ _id: id });

    if (!data) return NotFoundResponse(res);

    return SuccessResponse(res, data, MESSAGES.DELETED);
  }

  // Admins only
  async hardDelete(req: Request, res: Response) {
    const { id } = req.params;
    const data = await triviaService.hardDelete({ _id: id });

    if (!data) return NotFoundResponse(res);

    return SuccessResponse(res, data, MESSAGES.DELETED);
  }
}

export const triviaController = new Controller();
