
var Command = function(){

	this.commandsArray = new Array();
};

/**
	Metoda přijímá název příkazu zadaný z cmd
	overuje existenci prikazu
	param@ string
*/
Command.prototype.checkCommand = function(command){
	var i;
	for(i = 0; i < this.commandsArray.length; i+=1){
		if(command === this.commandsArray[i].title){
			return true;
		}
	}
	return false;

}

/**
	Funkce přidá nový příkaz do pole příkazů
	param@ object
*/
Command.prototype.registerCommand = function(command){
	var i;
	for(i = 0; i < this.commandsArray.length; i+=1){
		if(command.title === this.commandsArray[i].title){
			return false;
		}
	}

	this.commandsArray.push(command);
	return true;
}


/**
	Funkce odebere příkaz z pole příkazů
	param@ object
*/
Command.prototype.unregisterCommand = function(command){

	var i;
	for(i = 0; i < this.commandsArray.length; i+=1){
		if(command.title === this.commandsArray[i].title){
			this.commandsArray.splice(i, 1);
			return true;
		}
	}

	return false;
}

/**
	Funckce vytvoří nové pole příkazů.
*/
Command.prototype.unregisterAllCommands = function(){

	this.commandsArray = [];
}

/**
	Funckce vrátí pole příkazů
*/
Command.prototype.getCommandsArray = function(){

	return this.commandsArray;
}

/**
	Funckce vrátí objekt příkazu na základě jeho nazvu
	param@ string 
*/
Command.prototype.getCommand = function(command){

	var i;
	for(i = 0; i < this.commandsArray.length; i+=1){
		if(this.commandsArray[i].title === command){
			return this.commandsArray[i];		
		}
	}
	return false;
	
}

