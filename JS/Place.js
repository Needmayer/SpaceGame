var Place = function(title, descriptionObject){

	this.title = title;
	this.descriptionObject = descriptionObject;
	this.description = descriptionObject.default;
	this.things = [];
	this.exits = [];
	this.persons = [];

	extend(this, new Observer());

	this.update = function(cmd, input){
		var check;
		if(cmd instanceof CommandTake){
			check = this.checkTakingThing(input);
			if(check !== false){
				this.removeThing(check);
			}

		}else if (cmd instanceof CommandPut){
			if(this.checkPutingThing(input)){
				this.addThing(input);
			}
		}else{

			for(check in descriptionObject){
				if(check !== "default" && check === input){
					this.description = descriptionObject[check];
				}
			}
		}
	}
}

Place.prototype.getInfoAnswer = function(){
	return {
		název: this.title,
		popis:this.description
	};
}

/**
	vrati pole veci v mistnosti
*/
Place.prototype.getThings = function(){
	return this.things;
}

/**
	Prida vec do pole veci mistnosti
*/
Place.prototype.addThing = function(thing){
	this.things.push(thing);	
}

/**
	Odebere věc z pole veci  místnosti podle indexu
*/
Place.prototype.removeThing = function(index){
	this.things.splice(index,1);
}

/**
	vrátí pole obsahující názvy vychodu nebo veci v mistnosti
*/

Place.prototype.getTitles = function (array) {
	var titles = [], i;
	if(this.hasOwnProperty(array)){
		for (i = 0; i < this[array].length; i+=1){
			if(typeof (this[array][i]) == "object" && this[array][i].hasOwnProperty("title") && (typeof (this[array][i].title)) !== 'undefined'){
				titles.push(this[array][i].title);	
			}		
		}	
	}
	
	return titles;
}

/**
	zkontroluje zdali je předaný input instance věci, věc je přenositelna a vejde se do inventare před jeho pridanim
	param@thing --object (Thing)
	return boolean || int --index
*/
Place.prototype.checkTakingThing = function(thing){
	var i;
	if(!(thing instanceof Thing)){
		return false;
	}

	if(!thing.trasferable){
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
	zkontroluje zdali je předaný input instance věci
	param@thing --object (Thing)
	return boolean
*/
Place.prototype.checkPutingThing = function(thing){
	if(!(thing instanceof Thing)){
		return false;
	}
	
	return true;
}