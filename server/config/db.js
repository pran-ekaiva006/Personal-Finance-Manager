
import { Sequelize } from 'sequelize';

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