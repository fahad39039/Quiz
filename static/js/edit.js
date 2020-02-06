var EditModel = function(){
	
	var self=this;
	self.Question = ko.observable("");
	self.Answer = ko.observable("");
	self.Option1 = ko.observable("");
	self.Option2 = ko.observable("");
	self.Option3 = ko.observable("");
	self.Option4 = ko.observable("");

	$.ajax({
			async: false,
			url: "./updateQuiz",
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json',
			success: function(data){
			},
			error: function(error) {
			}
		});

	self.submitQuestion = function(id){
		console.log(id);
		var dat = {
			"Question": self.Question(),
			"Answer": self.Answer(),
			"Option1":self.Option1(),
			"Option2":self.Option2(),
			"Option3":self.Option3(),
			"Option4":self.Option4(),
		}

		
	}
}


ko.applyBindings(new EditModel());