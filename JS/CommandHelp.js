var CommandHelp = function(desc, game, command){
	this.description = desc;
	this.title = "pomoc";
	this.paramCount = 0;
	this.game = game;
	this.command = command;
	extend(this, new Subject());
	extend(this, new SubjectAnswer());	
}


CommandHelp.prototype.checkParams = function(params){
	
	if(params.length === this.paramCount || params.length === 1){		
		return true;
	}else{
		this.notifyAnswer(this, "wrongParamCountOne");	
		return false;
	}
}

CommandHelp.prototype.checkParameter = function(param){
	if(param.length ===0) {
		this.notifyAnswer(this, "help", this.game.getActualPlace());
		return false;
	}
	if(this.game.getObject(param[0], "arrayOfThings")) this.notifyAnswer(this, "descThing", this.game.getObject(param[0], "arrayOfThings"));
	else if(this.game.getObject(param[0], "arrayOfPersons")) this.notifyAnswer(this, "descPerson", this.game.getObject(param[0], "arrayOfPersons"));
	else if(this.game.getObject(param[0], "arrayOfPlaces")) this.notifyAnswer(this, "descPlace", this.game.getObject(param[0], "arrayOfPlaces"));
	else if(this.command.getCommand(param[0])) this.notifyAnswer(this, "descCommand", this.command.getCommand(param[0]));
	else if(param[0] === "prikazy" || param[0] === "příkazy"){
		this.notifyAnswer(this, "descAllCommands", this.command.getCommandsArray());
	}else{
		this.notifyAnswer(this, "wrongParamHelp");
		return false;
	}

	 
	
}


CommandHelp.prototype.execute = function(param){
	
	this.notifyAnswer(this, " ");
}
CommandHelp.prototype.getInfoAnswer = function(){
	return {
		název: this.title,
		popis: this.description
	};
}