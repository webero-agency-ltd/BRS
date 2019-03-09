import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../interface/SequelizeAttributes';

export interface TagsearchAttributes {

    id?: number;
    valueTag?: number;
    textTag?: string;

};

export interface TagsearchInstance extends Sequelize.Instance<TagsearchAttributes>, TagsearchAttributes {
    
}; 

export const TagsearchFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<TagsearchInstance, TagsearchAttributes> => {
    
    const attributes: SequelizeAttributes<TagsearchAttributes> = {
      valueTag: {
          type: DataTypes.STRING
      },
      textTag: {
          type: DataTypes.STRING
      }
    };

    const Tagsearch = sequelize.define<TagsearchInstance, TagsearchAttributes>('Tagsearch', attributes);

    return Tagsearch ;

};