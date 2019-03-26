module.exports = {

    name: {
        presence: false,
          length: {
            maximum: 255, 
            message: "must be at least 6 characters and < 255"
        }
    },
    prixLv1: {
        presence: false,
          length: { 
            maximum: 255,
            message: "must be at least 6 characters and < 255"
        }
    },
    prixLv2: {
        presence: false,
          length: {
            maximum: 255, 
            message: "must be at least 6 characters and < 255"
        }
    },
    tag: {
        presence: false,
          length: {
            maximum: 255, 
            message: "must be at least 6 characters and < 255"
        }
    }
  
}
