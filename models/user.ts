import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import db from '../server/dbConnection';
import Participate from './particitape';
import Poll from './poll';

interface UserTypes extends Model<InferAttributes<UserTypes>, InferCreationAttributes<UserTypes>>{
  id: number,
  name: string,
  email: string,
  password: string,
  created_at: Date,
  status: boolean
}

const User = db.define<UserTypes>('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  created_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('now')
  },
  status: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

// Polls
User.hasMany(Poll);
Poll.belongsTo(User);

// Participates
User.hasMany(Participate);
Participate.belongsTo(User);


export default User