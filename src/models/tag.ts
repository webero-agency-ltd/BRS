
const type = require('sequelize');
const { Instance } = require('../config/sequelize');

module.exports = () => {
    
    return Instance.define('user', {
        id: {
          	type: type.INTEGER,
          	primaryKey: true,
          	autoIncrement: true
        },
        option: type.STRING,
        tags: type.JSON,
    })

}

