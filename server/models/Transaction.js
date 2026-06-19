
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './User.js';

const Transaction = sequelize.define('Transaction', {
  type: { type: DataTypes.ENUM('Income', 'Expense'), allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  description: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  isRecurring: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  frequency: { type: DataTypes.ENUM('monthly', 'weekly'), allowNull: true },
});

Transaction.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
User.hasMany(Transaction);

export default Transaction;
