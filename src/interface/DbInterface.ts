import * as Sequelize from 'sequelize';
import { UserAttributes, UserInstance } from '../models/user';
import { ProduitAttributes, ProduitInstance } from '../models/produit';
import { TagsearchInstance, TagsearchAttributes } from '../models/tagsearch';

export interface DbInterface {
  	sequelize: Sequelize.Sequelize;
  	Sequelize: Sequelize.SequelizeStatic;
  	User: Sequelize.Model<UserInstance, UserAttributes>;
  	Produit: Sequelize.Model<ProduitInstance, ProduitAttributes>;
  	Tagsearch: Sequelize.Model<TagsearchInstance, TagsearchAttributes>;
}
