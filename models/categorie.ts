import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import db from '../server/dbConnection';
import Poll from './poll';

interface CategoryTypes extends Model<InferAttributes<CategoryTypes>, InferCreationAttributes<CategoryTypes>>{
  id: CreationOptional<Number>,
  name: string
}

const Category = db.define<CategoryTypes>('categories', {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  }

});

// Poll
Category.hasMany(Poll);
Poll.belongsTo(Category);

export default Category;