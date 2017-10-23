var CommandPut = function(desc, game, inventory){
	this.game = game;
	this.inventory = inventory;
	this.description = desc;
	this.title = "poloz";
	this.paramCount = 1;

	extend(this, new Subject());
	extend(this, new SubjectAnswer());

}


CommandPut.prototype.checkParams = function(params){
	
	if(params.length === this.paramCount){		
		return true;
	}else{
		this.notifyAnswer(this, "wrongParamCountOne");	
		return false;
	}
}

CommandPut.prototype.checkParameter = function(param){
	var i;

	for(i = 0; i < this.inventory.things.length; i+=1){
		if(this.inventory.things[i].title === param[0]){
			return this.inventory.things[i];
		}
	}
	this.notifyAnswer(this, "wrongThingNotInInvetory");
	return false; //v inventari takova vec neni
}


CommandPut.prototype.execute = function(param){

	var thing = this.game.getObject(String(param), "arrayOfThings");
	this.notify(this, thing);
}

CommandPut.prototype.getInfoAnswer = function(){
	return {
		název: this.title,
		popis: this.description
	};
}