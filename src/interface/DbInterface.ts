import * as Sequelize from 'sequelize';
import { UserAttributes, UserInstance } from '../models/user';
import { ProduitAttributes, ProduitInstance } from '../models/produit';
import { TagsearchInstance, TagsearchAttributes } from '../models/tagsearch';
import { TagInstance, TagAttributes } from '../models/tag';

export interface DbInterface {
  	sequelize: Sequelize.Sequelize;
  	Sequelize: Sequelize.SequelizeStatic;
  	User: Sequelize.Model<UserInstance, UserAttributes>;
  	Produit: Sequelize.Model<ProduitInstance, ProduitAttributes>;
  	Tag: Sequelize.Model<TagInstance, TagAttributes>;
  	Config: Sequelize.Model<TagInstance, TagAttributes>;
}
