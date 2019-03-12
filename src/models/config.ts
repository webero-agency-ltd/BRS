import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../interface/SequelizeAttributes';

export interface ConfigAttributes {

    id?: number;
    name?: string;
    value?: string;

};

export interface ConfigInstance extends Sequelize.Instance<ConfigAttributes>, ConfigAttributes {
    
}; 

export const ConfigFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<ConfigInstance, ConfigAttributes> => {
    
    const attributes: SequelizeAttributes<ConfigAttributes> = {
      name: {
          type: DataTypes.STRING
      },
      value: {
          type: DataTypes.STRING
      }
    };

    const Config = sequelize.define<ConfigInstance, ConfigAttributes>('Config', attributes);

    return Config ;

};