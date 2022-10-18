import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import db from '../server/dbConnection';
import Option from './option';
import Participate from './particitape';

interface PollTypes extends Model<InferAttributes<PollTypes>, InferCreationAttributes<PollTypes>>{
  id: CreationOptional<Number>,
  description: string,
  created_at: Date,
  init_poll: Date,
  end_poll: Date,
  status: boolean,
  is_active: boolean,
  user_id: number,
  category_id: number
}

const Poll = db.define<PollTypes>('polls', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  created_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('now')
  },
  init_poll: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('now')
  },
  end_poll: {
    allowNull: false,
    type: DataTypes.DATE
  },
  is_active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
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
  category_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      key: 'id',
      model: 'categories'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
});

// Option
Poll.hasMany(Option);
Option.belongsTo(Poll);

// Participate
Poll.hasMany(Participate);
Participate.belongsTo(Poll);

export default Poll;