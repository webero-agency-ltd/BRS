
export default function on( el : HTMLElement , event :string , cbl :CallableFunction ) : void {
	el.addEventListener(event, function( ev ) {
        cbl( ev )
    })
}