import * as Sequelize from 'sequelize';
import { UserAttributes, UserInstance } from '../models/User';
import { ProduitAttributes, ProduitInstance } from '../models/produit';

export interface DbInterface {
  	sequelize: Sequelize.Sequelize;
  	Sequelize: Sequelize.SequelizeStatic;
  	User: Sequelize.Model<UserInstance, UserAttributes>;
  	Produit: Sequelize.Model<ProduitInstance, ProduitAttributes>;
}
