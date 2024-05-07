import dotenv from 'dotenv'
dotenv.config();

const config = {
  MONGODB_URI: process.env.MONGODB_URI,
  SECRETKEY: process.env.SECRETKEY,
  expiresIn: process.env.EXPIREDIN,
};

export default config;