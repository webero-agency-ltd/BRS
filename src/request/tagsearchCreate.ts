module.exports = {

    textTag: {
        presence: true,
          length: {
            maximum: 255, 
            message: "must be at least 6 characters and < 255"
        }
    },
    valueTag: {
        presence: true,
          length: {
            maximum: 255, 
            message: "must be at least 6 characters and < 255"
        }
    }, 
  
}
