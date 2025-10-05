
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './User.js';

const Budget = sequelize.define('Budget', {
  category: { type: DataTypes.STRING, allowNull: false, unique: true },
  amount: { type: DataTypes.FLOAT, allowNull: false },
});

Budget.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
User.hasMany(Budget);

export default Budget;