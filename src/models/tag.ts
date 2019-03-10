import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../interface/SequelizeAttributes';

export interface TagAttributes {

    id?: number;
    name?: string;
    value?: string;
    page_id?: number;
    rull?: number;

};

export interface TagInstance extends Sequelize.Instance<TagAttributes>, TagAttributes {
    
}; 

export const TagFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<TagInstance, TagAttributes> => {
    
    const attributes: SequelizeAttributes<TagAttributes> = {
      name: {
          type: DataTypes.STRING
      },
      value: {
          type: DataTypes.STRING
      },
      page_id: {
          type: DataTypes.INTEGER 
      },
      rull: {
          type: DataTypes.INTEGER 
      }
    };

    const Tag = sequelize.define<TagInstance, TagAttributes>('Tag', attributes);

    return Tag ;

};