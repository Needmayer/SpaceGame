var CommandUse = function(desc, game, inventory, state){
	this.description = desc;
	this.game = game;
	this.state = state;
	this.inventory = inventory;
	this.title = "pouzij";
	this.paramCount = 1;

	extend(this, new Subject());	
	extend(this, new SubjectAnswer());
}

/**
	kontrola velikosti přijatého pole podle počtu parametrů příkazu
*/
CommandUse.prototype.checkParams = function(params){
	if(params.length === 1 || params.length === 2){		
		return true;
	}else{
		this.notifyAnswer(this, "wrongParamOneTwo");
		return false;
	}
}
/**
	kotrola parametrů podle přijatého pole parametrů
*/
CommandUse.prototype.checkParameter = function(param){
	var i, first, second;

	if(first = this.checkBothParams(param[0])){				
		if(param.length === 2){
			if(param[1] === "dvere"){
				if(this.checkStates(first.title, this.game.getActualPlace().title, param[1])){return true;}
			}
			second = this.checkBothParams(param[1])
			if(second){
				if(!first.useable){
					this.notifyAnswer(this, "wrongThingNotUsable", first.title);
					return false;
				}			
				if(!second.useable){
					this.notifyAnswer(this, "wrongThingNotUsable", first.title);
					return false;
				}else{
					if(this.checkStates(first.title, second.title)){return true;}
					else this.notifyAnswer(this, "wrongThingNotUsableWay", first.title);
				}				
			}else{
				this.notifyAnswer(this, "wrongNoThingPlaceInv", param[1]);
			}
		}else{
			if(!first.useable){
				this.notifyAnswer(this, "wrongThingNotUsable", first.title);
				return false;
			}else{
				if(this.checkStates(first.title, this.game.getActualPlace().title)){return true;}
				else this.notifyAnswer(this, "wrongThingNotUsableWay", first.title);
			}
			
		}
	}else{
		this.notifyAnswer(this, "wrongNoThingPlaceInv", param[0]);
	}	
	return false; //v inventari takova vec neni
}
/**
	ověření správnosti zadaného parametru, kontroluje jestli je věc přítomna v místnosti nebo v batohu
*/
CommandUse.prototype.checkBothParams = function(param){
	var i, obj;	

	obj = this.inventory.things;
	for(i = 0; i < obj.length; i+=1){
		if(obj[i].title === param){				
			return obj[i];
		}
	}
	obj = this.game.getActualPlace().things;
	

	for(i = 0; i < obj.length; i+=1){
		if(obj[i].title === param){
			return obj[i];
		}
	}

	return false;
}

CommandUse.prototype.checkStates = function(t1, t2, t3){
	var i, answ = "";
	var states = this.state.getAllStates();
	for(i = 0; i < states.length; i+=1){
		if(states[i].active && window[states[i].title].prototype.hasOwnProperty("react")){		
			answ = states[i].react(t1, t2, t3);
			console.log(answ);
			if(answ !== false && answ !== undefined ){
				this.notifyAnswer(this, answ, t1);
				states[i].updateState();

				return true;
			}
		}
	}
	return false;

}

/**

*/
CommandUse.prototype.execute = function(param){

	
}

CommandUse.prototype.getInfoAnswer = function(){
	return {
		název: this.title,
		popis: this.description
	};
}