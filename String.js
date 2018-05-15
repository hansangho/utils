leadingZeros = function( n, digits ) {
	var zero = '',
		len = n.toString().length,
		i = 0;

	if ( len < digits ) {
		for ( ; i < digits - len; i += 1 ) {
			zero += '0';
		}
	}

	return zero + n;
};


// Get URL Parameter
util.getParam = function( paramName, _isStr ) {
	var _ret = '',
		href = location.href,
		found = !1,
		compareString = paramName + '=',
		compareLength = compareString.length;

	if ( href.indexOf( '?' ) > -1 ) {
		var strQueryString = href.substr( href.indexOf( '?' ) + 1 ),
			aQueryString = strQueryString.split( '&' ),
			i = 0,
			str;

		for ( ; str = aQueryString[ i ]; i += 1 ) {
			if ( str.substr( 0, compareLength ) === compareString ) {
				var aParam = str.split( '=' );
				if(_isStr){
					_ret = aParam[ 1 ];
				}else{
					if(aParam[ 1 ]=='') return ''
					_ret = parseInt( aParam[ 1 ], 10 );
				}
				found = !0;
				break;
			}
		}
	}

	if ( !found ) return '';

	return _ret;
};


// 조사
util.josa = function( text, josaNum, str ) {
	var code = text.charCodeAt( text.length - 1 ) - 44032,
		str = str || '',
		josa = [
			[ '를', '을' ],
			[ '로', '으로' ],
			[ '라고', '이라고' ]
		][ josaNum ];

	// 한글이 아닐 경우
	if ( ( code >= 0x3130 && code <= 0x318F ) || code >= 0xAC00 && code <= 0xD7A3 ) {
		return text;
	}

	text = text + str;

	if ( code % 28 === 0 ) { // 받침 없음
		return text + josa[ 0 ];
	} else { // 받침 있음
		return text + josa[ 1 ];
	}
};

// 조사
util.josa2 = function( text, josaNum ) {
	var code = text.charCodeAt( text.length - 1 ) - 44032,
		josa = [[ '를', '을' ],	[ '로', '으로' ],[ '라고', '이라고' ]][ josaNum ];

	// 한글이 아닐 경우
	if ( ( code >= 0x3130 && code <= 0x318F ) || code >= 0xAC00 && code <= 0xD7A3 ) return '';

	if ( code % 28 === 0 ) { // 받침 없음
		return josa[ 0 ];
	} else { // 받침 있음
		return josa[ 1 ];
	}
};


static reEscape(_str) {
    return _str
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>' )
        .replace(/&quot;/g, '\"' )
        .replace(/&#39;/g, '\'' );
}
static getParamByName( name, url ) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}





var isMobile = (/(iPhone|iPod|iPad|Android|NC Noob)/i.test(navigator.userAgent));