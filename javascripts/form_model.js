document.FormModel = {
	models: {},
	addModel: function(name, model) {
		FormModel.models[name] = model;
	},
  validate: function(form) {

	},
	init: function() {
		alert('form model loaded');

	}	
}
//HOW DO I GET getScript success to work?!?!
PoliteJS.scriptLoaded('FormModel');
