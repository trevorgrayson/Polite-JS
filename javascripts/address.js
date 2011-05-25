Address = {
	init: function() {
		FormModel.addModel('address',{
			city: /[a-zA-Z]+/
		});
		PoliteJS.log('Address loaded');
	}

}
