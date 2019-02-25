module.exports = {
	username: {
    	presence: true,
    	exclusion: {
      		within: ["nicklas"],
      		message: "'%{value}' is not allowed"
    	}
  	},
  	password: {
    	presence: true,
    	length: {
      		minimum: 54,
      		message: "must be at least 6 characters"
    	}
  	}
}