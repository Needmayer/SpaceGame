var CommandSpeak = function(desc, game){
	this.title = "mluv";
	this.description = desc;
	this.paramCount = 1;
	this.game = game;
	extend(this, new Subject());
	extend(this, new SubjectAnswer());	
}


CommandSpeak.prototype.checkParams = function(params){
	
	if(params.length === this.paramCount){		
		return true;
	}else{
		this.notifyAnswer(this, "wrongParamCountOne");	
		return false;
	}
}

CommandSpeak.prototype.checkParameter = function(param){
	if(this.getPersons(param)) return true;
	this.notifyAnswer(this, "wrongNoPerson");
	return false;
}

CommandSpeak.prototype.getPersons = function(param){
	var i, place = this.game.getActualPlace();
	for(i = 0; i < place.persons.length; i += 1){
		if(place.persons[i].title === param[0]) return place.persons[i];
	}
	return false;
}


CommandSpeak.prototype.execute = function(param){
	
	this.notifyAnswer(this, " ", this.getPersons(param));
}

CommandSpeak.prototype.getInfoAnswer = function(){
	return {
		název: this.title,
		popis: this.description
	};
}