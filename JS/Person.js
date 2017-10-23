var Person = function(title, description, answer){

	this.title = title;
	this.description = description;
	this.answer = answer;
}


Person.prototype.getInfoAnswer = function(){
	return {
		název: this.title,
		popis: this.description
	};
}