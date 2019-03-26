
let product_local = 'fr' ; 

let product_form_lang : object = require('../../resources/lang/'+product_local+'/form') ; 


console.log( product_form_lang['alpha_num'] ) ; 


module.exports = {

    name: {
        presence: true,
          length: { 
            maximum: 255, 
            message: product_form_lang['alpha_num'] 
        }
    },
    prixLv1: {
        presence: true,
          length: { 
            maximum: 255,
            message: product_form_lang['alpha_num'] 
        }
    },
    prixLv2: {
        presence: true,
          length: {
            maximum: 255, 
            message: product_form_lang['alpha_num'] 
        }
    },
    tag: {
        presence: true,
          length: {
            maximum: 255, 
            message: product_form_lang['alpha_num'] 
        }
    }
  
}
