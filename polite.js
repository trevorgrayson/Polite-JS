PoliteJS = {
	libs: [],
  REPO: ['http://somemasterepo.com/'],

	init: function () {
		var lib, obj, pkg, repo = null;

		for( var i in PoliteJS.libs ) {
			lib = PoliteJS.libs[i];

      try {
        obj = eval(lib)

      } catch (e) {
        //Object is not loaded.  Go get it.
				pkg = lib.replace(/([^^])([A-Z])/g, function($_,$1,$2){ return $1 + '_' +$2.toLowerCase()}).replace(/(^.)/,function($1){ return $1.toLowerCase()})

        //iterate if fail
        print(PoliteJS.REPO[0] + pkg + '.js');
        //check for model fail

      }

      //init library
      if( obj && obj.init ) {
        obj.init();
      }

		}
	},

	register: function(klass) {
    PoliteJS.libs.push(klass);
	},

  addRepository: function(repo) {
    PoliteJS.REPO.unshift(repo);
  },

  bootstrapBrowsers: function(document) {
    //thanks jQuery 
    if ( document.addEventListener ) {
      // Use the handy event callback
      document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

      // A fallback to window.onload, that will always work
      window.addEventListener( "load", PoliteJS.init, false );

    // If IE event model is used
    } else if ( document.attachEvent ) {
      // ensure firing before onload,
      // maybe late but safe also for iframes
      document.attachEvent( "onreadystatechange", DOMContentLoaded );

      // A fallback to window.onload, that will always work
      window.attachEvent( "onload", PoliteJS.init );

      // If IE and not a frame
      // continually check to see if the document is ready
      var toplevel = false;

      try {
        toplevel = window.frameElement == null;
      } catch(e) {}

      if ( document.documentElement.doScroll && toplevel ) {
        doScrollCheck();
      }
    }
  }
}

if(typeof document == 'object') {
  PoliteJS.bootstrapBrowsers(document);
}

PoliteJS.register('FormModel');
PoliteJS.addRepository('/javascripts/');
PoliteJS.init();
