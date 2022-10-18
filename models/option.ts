import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreateOptions } from 'sequelize';
import db from '../server/dbConnection';
import Participate from './particitape';

interface OptionTypes extends Model<InferAttributes<OptionTypes>, InferCreationAttributes<OptionTypes>>{
  id: CreateOptions<Number>,
  name: string,
  amount_vote: number,
  poll_id: number
}

const Option = db.define<OptionTypes>('options', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  amount_vote: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0
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
  }
});

// Participates
Option.hasMany(Participate);
Participate.belongsTo(Option);

export default Option;