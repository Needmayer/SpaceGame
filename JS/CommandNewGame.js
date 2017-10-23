var CommandNewGame = function(desc){
	this.description = desc;
	this.title = "nova_hra";
	this.paramCount = 0;

	extend(this, new Subject());
	extend(this, new SubjectAnswer());
}


CommandNewGame.prototype.checkParams = function(params){
	
	if(params.length === this.paramCount){		
		return true;
	}else{
		this.notifyAnswer(this, "wrongParamCountNone");	
		return false;
	}
}

CommandNewGame.prototype.checkParameter = function(param){
	return true;
}


CommandNewGame.prototype.execute = function(param){

	this.notify(this, "nova_hra");
}

CommandNewGame.prototype.getInfoAnswer = function(){
	return {
		název: this.title,
		popis: this.description
	};
}