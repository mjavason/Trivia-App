import express from 'express';
const router = express.Router();
import triviaRoute from './trivia.route';
import isAuth from '../../../middleware/is_auth.middleware';

router.use(isAuth);
router.use('/trivia', triviaRoute);

export default router;
