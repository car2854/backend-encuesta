import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreateOptions } from 'sequelize';
import db from '../server/dbConnection';

interface ParticipateTypes extends Model<InferAttributes<ParticipateTypes>, InferCreationAttributes<ParticipateTypes>>{
  id: CreateOptions<Number>,
  user_id: number,
  poll_id: number,
  option_id: number
}

const Participate = db.define<ParticipateTypes>('participates', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  user_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      key: 'id',
      model: 'users'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  poll_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      key: 'id',
      model: 'polls'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  option_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      key: 'id',
      model: 'options'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
});

export default Participate