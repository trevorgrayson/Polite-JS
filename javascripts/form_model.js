FormModel = {
	models: {},
	addModel: function(name, model) {
		FormModel.models[name] = model;
	},
  validate: function(form) {

	},
	init: function() {
		console.log('form model loaded');

	}	
}
