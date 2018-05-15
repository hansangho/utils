
	util.random = (function() {
		var saved = 0;

		return {
			get : function( max ) {
				if ( !max ) return;
	
				var random = parseInt( Math.random() * max );
				while ( saved === random ) {
					random = parseInt( Math.random() * max );
				}
	
				return saved = random;
			}
		};
	})();


    static randomNum (_max, _min) {
        let result = parseInt(Math.random() * (_max-_min+1));
        if(result===(_max-_min+1)) --result;
        result += _min;
        return result;
    }
