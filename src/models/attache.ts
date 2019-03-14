import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../interface/SequelizeAttributes';

export interface AttacheAttributes {

    id?: number;
    type?: string;
    attachable_id?: number;
    attacha_id?: number;

}; 

export interface AttacheInstance extends Sequelize.Instance<AttacheAttributes>, AttacheAttributes {
    
}; 

export const AttacheFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<AttacheInstance, AttacheAttributes> => {
    
    const attributes: SequelizeAttributes<AttacheAttributes> = {
      type: {
          type: DataTypes.STRING
      },
      attachable_id: {
          type: DataTypes.INTEGER
      },
      attacha_id: {
          type: DataTypes.INTEGER 
      },
    };

    const Attache = sequelize.define<AttacheInstance, AttacheAttributes>('Attache', attributes);

    return Attache ;

};