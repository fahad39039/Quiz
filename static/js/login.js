var LoginModel = function(){
	
	var self=this;
	self.username = ko.observable();
	self.password = ko.observable();
	self.submit = function(){
		var credential = {
			"username": self.username(),
			"password": self.password()
		}

		$.ajax({
			url: "./postLogin",
			type: 'POST',
			data: JSON.stringify(credential),
			dataType: 'json',
			contentType: 'application/json',
			success: function(){
				console.log("jhhjh");
			},
			error: function(error) {
				console.log("jghjg");
			}
		});
}
}


ko.applyBindings(new LoginModel());