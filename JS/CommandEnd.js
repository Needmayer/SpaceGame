var CommandEnd = function(desc){
	this.description = desc;
	this.title = "konec";
	this.paramCount = 0;

	extend(this, new Subject());
	extend(this, new SubjectAnswer());
}


CommandEnd.prototype.checkParams = function(params){
	
	if(params.length === this.paramCount){		
		return true;
	}else{
		this.notifyAnswer(this, "wrongParamCountNone");	
		return false;
	}
}

CommandEnd.prototype.checkParameter = function(param){
	return true;
}


CommandEnd.prototype.execute = function(param){

	this.notify(this, "konec");
}

CommandEnd.prototype.getInfoAnswer = function(){
	return {
		název: this.title,
		popis: this.description
	};
}