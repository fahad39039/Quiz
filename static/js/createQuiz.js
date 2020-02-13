var ViewModel2 = function(){
	var self=this;
	self.Question = ko.observable("");
	self.Answer = ko.observable("");
	self.Option1 = ko.observable("");
	self.Option2 = ko.observable("");
	self.Option3 = ko.observable("");
	self.Option4 = ko.observable("");

	self.submitQuestion = function(id){
		var add_dict = {
			"Question": self.Question(),
			"Answer": self.Answer(),
			"Option1":self.Option1(),
			"Option2":self.Option2(),
			"Option3":self.Option3(),
			"Option4":self.Option4(),
		}

		$.ajax({
			url: "./createQuiz",
			type: 'POST',
			data: JSON.stringify(add_dict),
			dataType: 'json',
			contentType: 'application/json',
			success: function(data){
			},
			error: function(error) {
			}
		});
	}
	self.updateQuestion = function(){
		console.log(question)
		var update_dict = {
			"Question": document.getElementById('question').value,
			"Answer": document.getElementById('answer').value,
			"Option1": document.getElementById('op1').value,
			"Option2": document.getElementById('op2').value,
			"Option3": document.getElementById('op3').value,
			"Option4": document.getElementById('op4').value,
		}

		$.ajax({
			url: "/updateQuiz/"+id,
			type: 'POST',
			data: JSON.stringify(update_dict),
			dataType: 'json',
			contentType: 'application/json',
			success: function(data){
			},
			error: function(error) {
			}
		});
	}
}
ko.applyBindings(new ViewModel2());
