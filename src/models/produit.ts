import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../interface/SequelizeAttributes';

export interface ProduitAttributes {

  	id?: number;
  	
	name: string;
	prixLv1: string;
	prixLv2: string;
	tag: string;

  	createdAt?: Date;
  	updatedAt?: Date;

};

export interface ProduitInstance extends Sequelize.Instance<ProduitAttributes>, ProduitAttributes {
	  
};

export const ProduitFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<ProduitInstance, ProduitAttributes> => {
  	
  	const attributes: SequelizeAttributes<ProduitAttributes> = {
  		name: {
      		type: DataTypes.STRING
    	},
    	prixLv1: {
      		type: DataTypes.STRING
    	},
    	prixLv2: {
      		type: DataTypes.STRING
    	},
    	tag: {
      		type: DataTypes.STRING
    	},
  	}

  	const Produit = sequelize.define<ProduitInstance, ProduitAttributes>('Produit', attributes);

  	return Produit;

}