PoliteJS = {
	libs: [],

	onload: function () {
		var lib = null;
    var obj = null;
    var pkg = null;

		for( var i in PoliteJS.libs ) {
			lib = PoliteJS.libs[i];

      try {
        obj = eval(lib)

      } catch (e) {
        //Object is not loaded.  Go get it.
				pkg = lib.replace(/([^^])([A-Z])/g, function($_,$1,$2){ return $1 + '_' +$2.toLowerCase()}).replace(/(^.)/,function($1){ return $1.toLowerCase()})
        print('http://getfromrepo.usted/' + pkg + '.js');

      }

      //init library
      if( obj && obj.init ) {
        obj.init();
      }

		}
	},

	register: function(klass) {
    PoliteJS.libs.push(klass);
	}
}

PoliteJS.register('HighMe');
PoliteJS.register('BobDos');
PoliteJS.onload();
