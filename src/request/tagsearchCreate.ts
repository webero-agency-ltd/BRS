module.exports = {

    text: {
        presence: true,
          length: {
            maximum: 255, 
            message: "must be at least 6 characters and < 255"
        }
    },
    value: {
        presence: true,
          length: {
            maximum: 255, 
            message: "must be at least 6 characters and < 255"
        }
    }, 
  
}
