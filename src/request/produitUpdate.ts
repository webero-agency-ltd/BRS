module.exports = {

    name: {
        presence: true,
          length: {
            maximum: 255, 
            message: "must be at least 6 characters and < 255"
        }
    },
    prixLv1: {
        presence: true,
          length: {
            maximum: 255, 
            message: "must be at least 6 characters and < 255"
        }
    },
    prixLv2: {
        presence: true,
          length: {
            maximum: 255, 
            message: "must be at least 6 characters and < 255"
        }
    },
    tag: {
        presence: true,
          length: {
            maximum: 255, 
            message: "must be at least 6 characters and < 255"
        }
    }
  
}
