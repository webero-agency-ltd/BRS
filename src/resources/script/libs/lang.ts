import Mustache from 'mustache'
import { decode } from './htmlentities'

let local = null ; 
let all = Object.assign({}, window.trans );

let search = function ( id : string , data : object ) {
    
    if (id&&all[id]) {
        //compile si data existe
        if (data) {
            let output = Mustache.render(all[id], data);
            return decode( output ).replace(/&amp;/g, '&') ; 
        }
        return all[id] ; 
    }
    else if (id) {
        return decode( id ).replace(/&amp;/g, '&') ;
    }
    else{
        return '';
    }

}

export default function lang(id,data={}) {

    return search( id , data ) ;

}

