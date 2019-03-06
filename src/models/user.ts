import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../interface/SequelizeAttributes';

export interface UserAttributes {

  	id?: number;
    contactId?: number;
    family_name?: string;
  	given_name?: string;
  	email: string;
    password: any;
  	rememberToken?: string;
  	createdAt?: Date;
  	updatedAt?: Date;

};

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
	  
}; 

export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
  	
  	const attributes: SequelizeAttributes<UserAttributes> = {
    	given_name: {
          type: DataTypes.STRING
      },
      family_name: {
          type: DataTypes.STRING
      },
    	email: {
      		type: DataTypes.STRING
    	},
      contactId: {
          type: DataTypes.INTEGER
      },
      password: {
          type: DataTypes.STRING
      },
      rememberToken: {
          type: DataTypes.STRING
      }
  	};

  	const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);

	/*
		User.associate = models => {
		    User.hasMany(models.Comment, { foreignKey: 'AuthorId', as: 'comments' });
		    User.hasMany(models.Post, { foreignKey: 'AuthorId', as: 'posts' });
		    User.belongsToMany(models.Comment, {
		      through: 'PostUpvotes',
		      as: 'upvotedComments'
		    });
		  };
	*/
  	return User;

};