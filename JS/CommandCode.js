var CommandCode = function(desc,game, state){
	this.description = desc;
	this.title = "vloz_kod";
	this.paramCount = 1;
	this.game = game;
	this.state = state;
	extend(this, new Subject());
	extend(this, new SubjectAnswer());	
}


CommandCode.prototype.checkParams = function(params){
	
	if(params.length === this.paramCount){		
		return true;
	}else{
		this.notifyAnswer(this, "wrongParamCountOne");	
		return false;
	}
}

CommandCode.prototype.checkParameter = function(param){
	if(this.checkState(param)){
		return true;
	}
	return false;
	
}

CommandCode.prototype.checkState = function(param){
	var i, states = this.state.getAllStates();
	for(i = 0; i < states.length; i+=1){
		if(states[i].active && window[states[i].title].prototype.hasOwnProperty("react")){		
			answ = states[i].react(this, this.game.getActualPlace(), this.state.getState("Codes"), param[0])
			if(answ !== false && answ !== undefined ){
				//this.notifyAnswer(this, answ);
				return true;
			}
		}
	}
	

}

CommandCode.prototype.execute = function(param){
	
//	this.notifyAnswer(this, " ", this.getPersons(param));
}

CommandCode.prototype.getInfoAnswer = function(){
	return {
		název: this.title,
		popis: this.description
	};
}