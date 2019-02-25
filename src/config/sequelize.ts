module.exports = {
  	username : "root",
  	database : "brs-app",
  	password : null,
  	params : {
  		host: 'localhost',
	  	dialect: 'mysql',
		pool: {
		    max: 10,
		    min: 0,
		    acquire: 30000,
		    idle: 10000
		}
	}
}