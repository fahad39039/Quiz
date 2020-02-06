var ViewModel = function(){
	
	var self=this;

	self.counter = ko.observableArray([]);
	
	var color = function (id, name, isChecked) {
    this.Id = ko.observable(id);
    this.Name = ko.observable(name);
    this.IsChecked = ko.observable(isChecked);
    this.IsCheckedOriginal = ko.utils.unwrapObservable(this.IsChecked);

    // Subscribe when checked changes and push or remove items
    this.IsChecked.subscribe(function () {
        if (this.IsChecked() != this.IsCheckedOriginal) {
            self.counter.push(this);
            console.log(self.counter().length);
        } else {
            self.counter.remove(this);
            console.log(self.counter().length);
        }
    }.bind(this));
};
	self.colors = ko.observableArray([
    new color(101, "Red", false),
    new color(102, "Blue", false),
    new color(103, "Green", false),
    new color(104, "Violet", false)]);


	self.val = ko.observable(true);
	self.index_of_dict = ko.observable(0);
	self.myData = ko.observableArray();
	self.score = ko.observable(0);
	self.beforeSubmission = ko.observable(true);
	

	$.ajax({
			async: false,
			url: "./get_questions",
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json',
			success: function(data){
				self.myData(data);
			},
			error: function(error) {
			}
		});

	self.indexIncrement = function() {
		self.index_of_dict(self.index_of_dict() + 1);
		console.log(self.myData().length)
	}
	self.indexDecrement = function() {
		self.index_of_dict(self.index_of_dict() - 1);
	}
	self.jumpToQuestion = function(ques) {
		self.index_of_dict(ques);
		console.log(self.myData().length)
	}
	self.isCorrect = function(data){
		if(data == self.myData()[self.index_of_dict()].answer){
			console.log('yes')
		}
	}

	self.checkPre = function(data){
		return ko.pureComputed(function(){
			if(data.ischecked == true){
				return data.data;
			}
			return '';
		});
	}

	self.setValue = function(data, index){
		console.log(self.myData()[index].options.length)

		for (var i = 0; i <= self.myData()[index].options.length - 1; i++) {
			if (self.myData()[index].options[i].data == data.data){
				self.myData()[index].options[i].ischecked = true;
			}
			else{
				self.myData()[index].options[i].ischecked = false;
			}
		}
		return true;
	}

	self.submitQuiz = function(){
		console.log(self.score());
		console.log(self.myData().length);
		for (var i = 0; i <= self.myData().length - 1; i++) {
			for (var j = 0; j <= self.myData()[i].options.length - 1; j++){
				if (self.myData()[i].options[j].isCorrect == true && self.myData()[i].options[j].ischecked){
					self.score(self.score()+1);
				}
			}
		}
		self.beforeSubmission(false);
		$('#p1').css("width",(self.score()*100)/self.myData().length+'%');
		$('#p2').css("width", 100-(self.score()*100)/self.myData().length+'%');

	}

	
	self.callApi = function(id){
		window.location.href = "/updateQuiz/"+id;
	}

	self.editQuestion = function(id){
		window.location.href = "/updateQuiz/"+id;
	}

	self.deleteQuestion = function(id){
		console.log(id);

		// $.ajax({
		// 	url: "./deleteQuestion/"+id,
		// 	type: 'POST',
		// 	data: JSON.stringify(id),
		// 	dataType: 'json',
		// 	contentType: 'application/json',
		// 	success: function(data){
		// 		self.myData(data);
		// 	},
		// 	error: function(error) {
		// 	}
		// });

		$.ajax({
			async: false,
			url: "./deleteQuestion/"+id,
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json',
			success: function(data){
				console.log(self.myData);
			},
			error: function(error) {
				console.log("fddf")
			}
		});


	}

	self.addNewQuestion = function(){
		window.location.href = "/createQuiz";
	}
}


ko.applyBindings(new ViewModel());
