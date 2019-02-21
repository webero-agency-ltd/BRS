
export default function ready( cbl :CallableFunction ) : void {

    (function() {
	   
	   	cbl() ; 

	})();

}