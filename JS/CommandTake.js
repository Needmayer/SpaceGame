var CommandTake = function(desc, game, inventory){
	this.game = game;
	this.inventory = inventory;
	this.description = desc;
	this.title = "seber";
	this.paramCount = 1;

	extend(this, new Subject());	
	extend(this, new SubjectAnswer());

}


CommandTake.prototype.checkParams = function(params){
	
	if(params.length === this.paramCount){		
		return true;
	}else{
		this.notifyAnswer(this, "wrongParamCountOne");	
		return false;
	}
}

CommandTake.prototype.checkParameter = function(param){
	var i;
	var actualPlace = this.game.getActualPlace();

	for(i = 0; i < actualPlace.things.length; i+=1){
		if(actualPlace.things[i].title === param[0]){
			if(this.inventory.checkAddingThing(actualPlace.things[i])){
				return actualPlace.things[i];
			}else{
				return false;
			}			
		}
	}
	this.notifyAnswer(this, "wrongThingNotInPlace");
	return false;
}


CommandTake.prototype.execute = function(param){

	var thing = this.game.getObject(String(param), "arrayOfThings");
	this.notify(this, thing);
}

CommandTake.prototype.getInfoAnswer = function(){
	return {
		název: this.title,
		popis: this.description
	};
}