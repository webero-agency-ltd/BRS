import Sequelize from 'sequelize';

import { DbInterface } from '../interface/DbInterface';
import { UserFactory } from './user';
import { ProduitFactory } from './produit';
import { TagFactory } from './tag';
import { ConfigFactory } from './config';
import { AttacheFactory } from './attache';

export const createModels = (sequelizeConfig: any): DbInterface => {

    const { database, username, password, params } = sequelizeConfig;

    const sequelize = new Sequelize(database, username, password, params);

    const db: DbInterface = {
        sequelize,
        Sequelize,
        User: UserFactory(sequelize, Sequelize),
        Produit: ProduitFactory(sequelize, Sequelize),
        Tag: TagFactory(sequelize, Sequelize),
        Config: ConfigFactory(sequelize, Sequelize) , 
        Attache: AttacheFactory(sequelize, Sequelize) , 
    };

    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    return db;

};