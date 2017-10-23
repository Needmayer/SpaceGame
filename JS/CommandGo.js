var CommandGo = function(desc, game, state){
	this.game = game;
	this.state = state;
	this.description = desc;
	this.title = "jdi";
	this.paramCount = 1;

	extend(this, new Subject());
	extend(this, new SubjectAnswer());

}


CommandGo.prototype.checkParams = function(params){

	if(params.length === this.paramCount){		
		return true;
	}else{
		this.notifyAnswer(this, "wrongParamCountOne");		
		return false;
	}
}

CommandGo.prototype.checkParameter = function(param){
	
	if(!this.checkStates(param[0])){
		if(this.checkPlaceExist(param[0])){
			return true;
		}
	}
	return false;
}

/**
	zjisti jestli existuje zadany vychod
*/
CommandGo.prototype.checkPlaceExist = function(param){
	var i;
		var actualPlace = this.game.getActualPlace();
		if(param === actualPlace.title){
			this.notifyAnswer(this, "wrongSamePlace");
			return false;
		}
	
		for(i = 0; i < actualPlace.exits.length; i+=1){
			if(actualPlace.exits[i].title === param){
				return actualPlace.exits[i];
			}
		}		
	this.notifyAnswer(this, "wrongExit");	
	return false;	
}

/**
	zjisti jestli neni zadany vychod zablokovany
*/
CommandGo.prototype.checkStates = function(param){
	var i, answ;
	var states = this.state.getAllStates();
	for(i = 0; i < states.length; i+=1){
		if(states[i].active && window[states[i].title].prototype.hasOwnProperty("react")){	
			answ = states[i].react(this.game.getActualPlace().title, param)
			if(answ !== false && answ !== undefined){
				this.notifyAnswer(this, answ);
				return true;
			}
		}else{
		}
	}
	return false;

}

CommandGo.prototype.execute = function(param){

	var newPlace = this.game.getObject(String(param), "arrayOfPlaces");

	this.notify(this, newPlace);
}


CommandGo.prototype.getInfoAnswer = function(){
	return {
		název: this.title,
		popis: this.description
	};
}

