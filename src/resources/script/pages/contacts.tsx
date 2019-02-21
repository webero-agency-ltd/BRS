import * as React from 'react'
import reactDom from 'react-dom'
import Tableaux from './comp/tableaux'

import Button from 'react-bootstrap/Button';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'Tableaux': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

reactDom.render(

	<Tableaux/> , 
	document.getElementById('app') as Element

)