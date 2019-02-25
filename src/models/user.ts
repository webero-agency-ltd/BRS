import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../interface/SequelizeAttributes';

export interface UserAttributes {

  	id?: number;
  	username: string;
  	email: string;
  	password: string;
  	createdAt?: Date;
  	updatedAt?: Date;

};

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
	  
};

export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
  	
  	const attributes: SequelizeAttributes<UserAttributes> = {
    	username: {
      		type: DataTypes.STRING
    	},
    	email: {
      		type: DataTypes.STRING
    	},
    	password: {
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