var updateQuiz = function(){
	
	var self=this;
	self.Question = ko.observable("");
	self.Answer = ko.observable("");
	self.Option1 = ko.observable("");
	self.Option2 = ko.observable("");
	self.Option3 = ko.observable("");
	self.Option4 = ko.observable("");


}
console.log(data);

ko.applyBindings(new updateQuiz());