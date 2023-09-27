# Trivia Quiz Game API

## Overview

The Trivia Quiz Game API is a simple project that generates trivia quizzes based on users' IP locations. It's designed to provide a basic and fun quiz experience with location-specific questions.

## Getting Started

To use the Trivia Quiz Game API:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/mjavason/trivia-quiz-api.git
   ```

2. Navigate to the project directory:

   ```shell
   cd trivia-quiz-api
   ```

3. Install the required dependencies:

   ```shell
   npm install
   ```

4. Configure environment variables in a `.env` file:

   ```env
   PORT=3000
   DATABASE_URL=mongodb://localhost:27017/quizdb
   GEOLOCATION_API_KEY=your_geolocation_api_key
   ```

5. Start the API server:

   ```shell
   npm start
   ```

The API will be accessible at `http://localhost:5000` by default.

## IP Location-Based Quizzes

The unique feature of this API is its ability to generate quizzes based on the user's IP location. Here's how it works:

1. **IP Location Detection**: When a user makes a request to the API, it automatically detects their IP location using a geolocation service.

2. **Country Identification**: The API determines the user's country or region based on their IP address.

3. **Quiz Generation**: Using the detected location, the API fetches quiz questions related to that country or region.

4. **Personalized Quiz**: The API assembles a personalized quiz for the user, featuring questions and trivia specific to their location.

## API Documentation

For API usage details, refer to [...](#).

## Security

This is a demo project and doesn't implement advanced security measures. Do not use it in production without proper security enhancements.

## Contributing

Contributions are welcome! Feel free to fork and make improvements.

## Acknowledgments

Thanks to the community for supporting this demo project.
