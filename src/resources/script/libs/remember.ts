
export default async function remember( token :string , cbl : CallableFunction ) {
	
	let response = await fetch('/login',{
    	method : 'POST',
    	headers : {'Content-Type' : 'application/json'},
    	body : JSON.stringify( {email:'',password:'.....',remember:false} )
    })

    if ( response.ok ) { 
    	let data = await response.json() ; 
    	window.location.reload() ; 
    }else{
    	cbl( false )
    }

}