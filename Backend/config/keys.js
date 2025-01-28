module.exports = {
  mongoURI: process.env.MONGO_URI, // MongoDB URI from your .env file
  jwtSecret: process.env.JWT_SECRET, // JWT Secret for encoding and decoding tokens
};
