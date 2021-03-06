/* Copy right 2011 Trevor Grayson <trevor@trevorgrayson.com>. All rights reserved.  Licensed under the BSD License: http://www.opensource.org/licenses/bsd-license.html Version: 1.0.4 */ var LazyLoad=function(){var E=document,D=null,A=[],C;function B(){if(C){return }var G=navigator.userAgent,F;C={gecko:0,ie:0,webkit:0};F=G.match(/AppleWebKit\/(\S*)/);if(F&&F[1]){C.webkit=parseFloat(F[1])}else{F=G.match(/MSIE\s([^;]*)/);if(F&&F[1]){C.ie=parseFloat(F[1])}else{if((/Gecko\/(\S*)/).test(G)){C.gecko=1;F=G.match(/rv:([^\s\)]*)/);if(F&&F[1]){C.gecko=parseFloat(F[1])}}}}}return{load:function(K,L,J,I){var H=E.getElementsByTagName("head")[0],G,F;if(K){K=K.constructor===Array?K:[K];for(G=0;G<K.length;++G){A.push({url:K[G],callback:G===K.length-1?L:null,obj:J,scope:I})}}if(D||!(D=A.shift())){return }B();F=E.createElement("script");F.src=D.url;if(C.ie){F.onreadystatechange=function(){if(this.readyState==="loaded"||this.readyState==="complete"){LazyLoad.requestComplete()}}}else{if(C.gecko||C.webkit>=420){F.onload=LazyLoad.requestComplete;F.onerror=LazyLoad.requestComplete}}H.appendChild(F);if(!C.ie&&!C.gecko&&!(C.webkit>=420)){F=E.createElement("script");F.appendChild(E.createTextNode("LazyLoad.requestComplete();"));H.appendChild(F)}},loadOnce:function(N,O,L,P,G){var H=[],I=E.getElementsByTagName("script"),M,J,K,F;N=N.constructor===Array?N:[N];for(M=0;M<N.length;++M){K=false;F=N[M];for(J=0;J<I.length;++J){if(F===I[J].src){K=true;break}}if(!K){H.push(F)}}if(H.length>0){LazyLoad.load(H,O,L,P)}else{if(G){if(L){if(P){O.call(L)}else{O.call(window,L)}}else{O.call()}}}},requestComplete:function(){if(D.callback){if(D.obj){if(D.scope){D.callback.call(D.obj)}else{D.callback.call(window,D.obj)}}else{D.callback.call()}}D=null;if(A.length){LazyLoad.load()}}}}();

_ = PoliteJS = {
  libs: [],
  REPO: ['http://somemasterepo.com/'],
  config: {},

  init: function () {
    var lib, obj, pkg, repo = null;

    for( var i in PoliteJS.libs ) {
      lib = PoliteJS.libs[i];

      try {
        obj = eval(lib)

      } catch (e) {
        //Object is not loaded.  Go get it.
        pkg = lib.replace(/([^^])([A-Z])/g, function($_,$1,$2){ return $1 + '-' +$2.toLowerCase()}).replace(/(^.)/,function($1){ return $1.toLowerCase()})

        //iterate if fail
        //PoliteJS.log(PoliteJS.REPO[0] + pkg + '/' + pkg + '.js');
        PoliteJS.log("Loading: " + lib);
        PoliteJS.loadScript(PoliteJS.REPO[0] + pkg + '/' + pkg + '.js', PoliteJS.scriptLoaded, lib);
        //check for model fail

      }

    }
  },

  loadScript: function(uri, success, arg) {
    LazyLoad.load(uri, success, arg);
  },

  scriptLoaded: function(lib) {
    try {
      (new Function(lib + ".init()"))();
    } catch (e) { _.log(lib + ": No init found."); }
    try {
      //Need to pass lib as this (apply)
      PoliteJS.config[lib]();
    } catch (e) { _.log(lib + ": No config found."); }
  },

  register: function(klass) {
    PoliteJS.libs.push(klass);
  },

  addRepository: function(repo) {
    PoliteJS.REPO.unshift(repo);
  },

  log: function(msg) {
    if( typeof console == 'object' ) {
      console.log(msg);
    }
  },

  bootstrapBrowsers: function(document) {
    //thanks jQuery 
    if ( document.addEventListener ) {
      // Use the handy event callback
      //document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

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

//Load for browsers
if(typeof document == 'object') {
  PoliteJS.bootstrapBrowsers(document);
}
