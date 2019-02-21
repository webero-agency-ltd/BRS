module.exports = {

	transform : {
		"^.+\\.tsx?$" : 'ts-jest'
	},

	testMatch : [
		"**/test/**/*.test.ts", 
	],
	
	testEnvironment : 'node' , 

}