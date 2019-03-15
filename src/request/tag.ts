let tag_local = 'fr' ; 

let tag_lang : object = require('../resources/lang/'+tag_local+'/sinup') ; 

module.exports = {
	  value: {
    	presence: true,
    	exclusion: {
      		maximum: 255, 
          minimum: 2 ,
      		message: tag_lang["tage_value_error"]
    	}
  	}, 
    name: {
      presence: true,
      length: {
          maximum: 255, 
          minimum: 2 ,
          message: tag_lang['tage_name_error'] 
      }
    },
}