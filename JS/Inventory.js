function Inventory(){


	this.maxSize = 5;
	this.weight = 0;
	this.things = [];

	extend(this, new Observer());
	extend(this, new SubjectAnswer());


	this.update = function(cmd, input){
		var check;
		if(cmd instanceof CommandTake){

			if(this.checkAddingThing(input)){
				this.addThing(input);
				this.notifyAnswer(cmd, input.title);
			}
		}else if(cmd instanceof CommandPut){
				

			check = this.checkRemovingThing(input)
			if(check !== false){
				this.removeThing(check);
				this.notifyAnswer(cmd, input.title);
			}else{
				this.notifyAnswer(this, "wrongThingNotInInvetory");
			}
		}else return false;
	}

}

/**
	zkontroluje zdali je předaný input instance věci, věc je přenositelna a vejde se do inventare před jeho pridanim
	param@thing --object (Thing)
	return boolean
*/
Inventory.prototype.checkAddingThing = function(thing){

	if(!(thing instanceof Thing)){
		return false;
	}

	if(!thing.trasferable){
		this.notifyAnswer(this, "wrongThingNotTransferable");
		return false;
	}
	if(this.weight === this.maxSize){
		this.notifyAnswer(this, "wrongFullBackpack");
		return false;
	}

	if((this.weight + thing.weight) > this.maxSize){
		this.notifyAnswer(this, "wrongThingTooHeavy");
		return false;
	}

	return true;
}

/**
	zkontroluje zdali je předaný input instance věci a věc je v inventari
	param@object -Thing
	return boolean
*/
Inventory.prototype.checkRemovingThing = function(thing){
	var i;

	if(!(thing instanceof Thing)){
		return false;
	}

	for(i = 0; i < this.things.length; i += 1){
		if( this.things[i] === thing){
			return i;
		}
	}

	return false;
}
/**
	vrátí maximalni velikost inventare
*/
Inventory.prototype.getMaxSize = function(){
	return this.maxSize;
}

/**
	vrátí pole věcí v inventari
*/
Inventory.prototype.getThings = function(){
	return this.things;
}

/**
	vrátí pole obsahující názvy veci v inventari
	return@array -- pole názvů
*/
Inventory.prototype.getThingsTitles = function(){
	var titles = [], i;
	for (i = 0; i < this.things.length; i+=1){
		titles.push(this.things[i].title);
	}
	return titles;
}
/**
	odstraneni veci z inventare
	zmena vahy inventare o hodnotu odebirane veci
	param@int - index 
*/
Inventory.prototype.removeThing = function(index){
	this.changeWeight(this.things[index], "-");
	this.things.splice(index, 1);
}

/**
	prida vec do inventare
	param@object -Thing
*/
Inventory.prototype.addThing = function(thing){
			
	this.things.push(thing);
	this.changeWeight(thing, "+");
	
}

/**
	zmeni se vaha inventare
	podle paramentru mark se rozhoduje zdali se vaha pricita nebo odcita
	param@object -Thing
	param@char - znaménko + -
*/
Inventory.prototype.changeWeight = function(thing, mark){
	if(mark === "+"){
		this.weight+=thing.weight;	
	}else if(mark === "-"){
		this.weight-=thing.weight;		
	}	
	
}