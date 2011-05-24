PoliteJS = {
	libs: [],

	onload: function () {
		var lib;
		for( var i in PoliteJS.libs ) {
			lib = PoliteJS.libs[i];

			if ( typeof ( var obj = eval(klass) ) != 'object' ) {
				//Load lib
				klass.replace(/([^^])([A-Z])/g, function($_,$1,$2){ return $1 + '_' +$2.toLowerCase()}).replace(/(^.)/,function($1){ return $1.toLowerCase()})
			} else {
				var obj = eval(klass);

				if( klass.init ) {
					klass.init();
				}
			}
		}
	},

	register: function(klass) {
			PoliteJS.libs.push(obj);
	}
}
