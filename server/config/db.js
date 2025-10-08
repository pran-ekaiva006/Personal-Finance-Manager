import { Sequelize } from 'sequelize';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const PG_URI = process.env.PG_URI;

const sequelize = new Sequelize(PG_URI, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Set to false to allow self-signed certificates
    },
  },
});

// Connect DB with retry logic
const connectDB = async ({ retries = 5, delayMs = 1000 } = {}) => {
  let attempt = 0;
  while (attempt < retries) {
    try {
      await sequelize.authenticate();
      console.log('PostgreSQL Connected with SSL');
      return true;
    } catch (err) {
      attempt++;
      console.error(`Unable to connect to PostgreSQL (attempt ${attempt}/${retries}):`, err.message);
      if (attempt >= retries) return false;
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }
  return false;
};

export { sequelize };
export default connectDB;
