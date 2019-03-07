import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../interface/SequelizeAttributes';

export interface TagsearchAttributes {

    id?: number;
    value?: number;
    text?: string;

};

export interface TagsearchInstance extends Sequelize.Instance<TagsearchAttributes>, TagsearchAttributes {
    
}; 

export const TagsearchFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<TagsearchInstance, TagsearchAttributes> => {
    
    const attributes: SequelizeAttributes<TagsearchAttributes> = {
      value: {
          type: DataTypes.STRING
      },
      text: {
          type: DataTypes.STRING
      }
    };

    const Tagsearch = sequelize.define<TagsearchInstance, TagsearchAttributes>('Tagsearch', attributes);

    return Tagsearch ;

};