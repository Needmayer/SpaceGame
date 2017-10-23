var CommandWhat = function(desc, game, inventory){
	this.game = game;
	this.inventory = inventory;
	this.title = "coje";
	this.description = desc;
	this.paramCount = 1;
	this.param = "";
	extend(this, new SubjectAnswer());

}


CommandWhat.prototype.checkParams = function(params){
	
	if(params.length === this.paramCount){		
		return true;
	}else{
		this.notifyAnswer(this, "wrongParamCountOne");
		return false;
	}
}

CommandWhat.prototype.checkParameter = function(param){
	
	if(String(param) === "tady" || String(param) === "batoh"){

		return true;
	}
	this.notifyAnswer(this, "wrongWhatParam");
	return false;
}


CommandWhat.prototype.execute = function(param){
	var thingsTitles;
	this.param = param;
	if(String(param) === "tady"){
		thingsTitles = this.game.getActualPlace().getTitles("things");
	}else if(String(param) ==="batoh"){
		thingsTitles = this.inventory.getThingsTitles();
	}

	this.notifyAnswer(this, thingsTitles);
}


CommandWhat.prototype.getInfoAnswer = function(){
	return {
		název: this.title,
		popis: this.description
	};
}