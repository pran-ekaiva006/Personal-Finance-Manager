import { Sequelize } from 'sequelize';

if (!process.env.PG_URI) {
  throw new Error('PG_URI environment variable is not set. Please set it in your environment or .env file.');
}

console.log('PG_URI:', process.env.PG_URI);

const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: 'postgres',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected');
  } catch (err) {
    console.error('Unable to connect to PostgreSQL:', err.message);
    process.exit(1);
  }
};

export { sequelize };
export default connectDB;