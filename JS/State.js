function State(){

	this.states = [];


}

/**
	Zkontroluje zdali se jedna o object stavu
	param&state -- object
*/
State.prototype.checkState = function(state){

	if(!(typeof state === "object")){
		return false;
	}
	if(state.title === undefined){
		return false;
	}
	if(this.getStateByArgs(state)){
		return false;
	}

	return true;
	
}

/**
	prida novy stav do pole stavu
	param&state -- object
*/
State.prototype.addState = function(state){
	if(this.checkState(state)){
		this.states.push(state);
	}	
}
/**
	odebere stav z pole stavu
	param&state -- object
*/
State.prototype.removeState = function(state){
	var i;
	for(i = 0; i < this.states.length; i+=1){
		if(this.states[i] == state)
		this.states.splice(i, 1);
	}
}

/**
	vrati stav
	param&state --string
*/
State.prototype.getState = function(state){

	var i;
	for(i = 0; i < this.states.length; i+=1){
		if(String(state) === this.states[i].title){
			return this.states[i];
		}
	}
	return false;

}
/**
	vrati stav, který má stejný argumenty, z pole
	param&state --object
*/
State.prototype.getStateByArgs = function(state){

	var i;
	for(i = 0; i < this.states.length; i+=1){
		if(state.args === this.states[i].args){
			return this.states[i];
		}
	}
	return false;

}
/**
	vrati pole všech stavů
*/
State.prototype.getAllStates = function(){
	return this.states;
}