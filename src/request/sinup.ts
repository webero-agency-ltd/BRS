let local = 'fr' ; 

let lang : object = require('../resources/lang/'+local+'/sinup') ; 

module.exports = {
	  contactId: {
    	presence: true,
    	exclusion: {
      		isNumber: true,
      		message: lang["non_contact_id_error"]
    	}
  	},
    password: {
      presence: true,
      length: {
          maximum: 26, 
          minimum: 6 ,
          message: lang['pass_error_length'] 
      }
    },
    confpassword: {
      presence: true,
      length: {
          maximum: 26, 
          minimum: 6 ,
          message: lang['pass_error_length'] 
      }
    }
}