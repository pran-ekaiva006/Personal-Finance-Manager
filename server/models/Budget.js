import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './User.js';

const Budget = sequelize.define('Budget', {
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'user_category', // Scope uniqueness to the user
  },
  amount: { type: DataTypes.FLOAT, allowNull: false },
});

Budget.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    name: 'UserId', // Explicitly name the foreign key
    unique: 'user_category', // Add foreign key to the unique constraint
  },
  onDelete: 'CASCADE',
});
User.hasMany(Budget);

export default Budget;