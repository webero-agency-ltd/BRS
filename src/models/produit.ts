


module.exports = () => {
    
    let type = require('sequelize');
    let { Instance } = require('../config/sequelize');

    return Instance.define('user', {
        id: {
          	type: type.INTEGER,
          	primaryKey: true,
          	autoIncrement: true
        },
        name: type.STRING,
        prix_lv1: type.STRING,
        prix_lv2: type.STRING,
        tag: type.STRING
    })

}
