import * as Sequelize from 'sequelize';
import { UserAttributes, UserInstance } from '../models/user';
import { ProduitAttributes, ProduitInstance } from '../models/produit';
import { TagInstance, TagAttributes } from '../models/tag';
import { AttacheInstance, AttacheAttributes } from '../models/attache';
import { ConfigInstance, ConfigAttributes } from '../models/config';

export interface DbInterface {
  	sequelize: Sequelize.Sequelize;
  	Sequelize: Sequelize.SequelizeStatic;
  	User: Sequelize.Model<UserInstance, UserAttributes>;
  	Produit: Sequelize.Model<ProduitInstance, ProduitAttributes>;
  	Tag: Sequelize.Model<TagInstance, TagAttributes>;
  	Config: Sequelize.Model<ConfigInstance, ConfigAttributes>;
  	Attache: Sequelize.Model<AttacheInstance, AttacheAttributes>;
}
