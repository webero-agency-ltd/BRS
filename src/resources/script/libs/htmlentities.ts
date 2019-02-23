
export function encode( str : string[] ) : string {

    var buf = [];
    
    for (var i=str.length-1;i>=0;i--) {
        //buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }
    
    return buf.join('');

} 



export function decode( str : string ) : string {

    return str.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec);
    });

} 