
var addEventTinymce = function (argument) {

	if ( tinymce && tinymce.editors && tinymce.editors.length > 0 ) {
		for (var i = 0; i < tinymce.editors.length; i++) {
			tinymce.editors[i].onKeyDown.add( function (ed, evt) {
				console.log('Insert space' )
		      	if (evt.keyCode == 9){ // tab pressed
		        	ed.execCommand('mceInsertRawHTML', false, '<span class="mce-nbsp">&emsp;&emsp;&emsp;&emsp;</span>' ); // inserts tab
		        	evt.preventDefault();
		        	evt.stopPropagation();
		        	return false;
		      	}
			})
		}
		return true ;
	}else{
		return false ; 
	}

} 

var itervale = setInterval(function (argument) {

	if ( addEventTinymce() ) {
		clearInterval( itervale )
	}

}, 1000);

 