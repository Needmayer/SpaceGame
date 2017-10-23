function Game(init){

	this.command = new Command();
	this.level = new Level();
	this.inventory = new Inventory();
	this.state = new State();
	this.answer = new Answer();
	this.actualLevel = null;

	this.actualPlace = null;
	this.endPlace = null;
	this.arrayOfThings = [];
	this.arrayOfPlaces = [];
	this.arrayOfPersons = [];

	this.end = false;

	extend(this, new SubjectAnswer());
	extend(this, new Subject());
	extend(this, new Observer());

	if(init){	
	
		if(this.loadLevel("start", null)){
			if(this.actualLevel){
				this.initLevel();	
			}
		}				
	}
		

	
};
/**
	Funkce slouží k nastavení proměnné akctualLevel podle získaného objektu z levelu
*/

Game.prototype.loadLevel = function(levelName, levelObject){
	if(levelName !== null){
		this.actualLevel = this.level.getLevel(levelName);
		return true;
	}else if(typeof levelObject === "object"){
		this.actualLevel = levelObject;
		return true;
	}else return false;
	
}

/**
	Funkce inicializuje celou úroveň => vytvoření objektů (místností, věcí, postav)
*/
Game.prototype.initLevel = function(){	
	
	var level = this.actualLevel;
	this.initThings(level);
	this.initPlaces(level);
	this.initPersons(level);
	this.fillPlaces(level, "exits", "exits", "arrayOfPlaces");
	this.fillPlaces(level, "persons", "persons", "arrayOfPersons");
	this.fillPlaces(level, "things", "things", "arrayOfThings");
	this.setStartPlace(level);
	this.setEndPlace(level);
	this.initCommands(level);
	this.initStates(level);
	this.initObservers();
	this.notifyAnswer("", "welcome");
	this.updatePanelStates();
}

/**
	Inicializace věcí v úrovni z JSON objektu získaného z levelu
*/
Game.prototype.initThings = function(level){
	var i;
	for(i=0; i<level.things.length; i+=1){		
		this.arrayOfThings.push(new Thing(level.things[i][0],level.things[i][1],level.things[i][2],level.things[i][3],level.things[i][4]));			
	}
}
/**
	Inicializace míst v úrovni z JSON objektu získaného z levelu

*/
Game.prototype.initPlaces = function(level){
	var i, j;
	for(i=0; i<level.places.length; i+=1){	
		this.arrayOfPlaces.push(new Place(level.places[i][0],level.places[i][1]));	
	}
}
/**
	Inicializace postav v úrovni z JSON objektu získaného z levelu

*/
Game.prototype.initPersons = function(level){
	var i;
	for(i = 0; i <level.persons.length; i+=1){
		this.arrayOfPersons.push(new Person(level.persons[i][0], level.persons[i][1], level.persons[i][2]));
	}
}

/**
	Funkce vrátí object z pole.
	param@title	-- nazev objektu 
	param@fromArray -- nazev pole ze ktereho se vybira objekt
	return object || false
*/
Game.prototype.getObject = function(title, fromArray){

	var i;
	if(this[fromArray] === undefined) return false;
	for(i=0; i < this[fromArray].length; i+=1){
		if(this[fromArray][i].title === title){
			return this[fromArray][i];
		}
	}
	return false;
}

/**
	Funkce slouží k naplnění jednolivých polí objektu místnost
	nastavení východů z místnosti, věcí v místnoti, postav v místnosti

	param@level --objekt levelu
	param@set --string výběr co se má plnit (exits, things, persons)
	param@toArray --string pole do kterého se budou přidávat objekty 
	param@fromArray --string pole ze kterého se vybírají objekty 

*/

Game.prototype.fillPlaces = function(level, set, toArray, fromArray){
	var i, k, title;
	for(i = 0; i < this.arrayOfPlaces.length; i+=1){				
		
		for(k = 0; k < level.exitsAndThings[this.arrayOfPlaces[i].title][set].length; k+=1){	
			title = level.exitsAndThings[this.arrayOfPlaces[i].title][set][k];
			if(title !== false){
				this.arrayOfPlaces[i][toArray].push(this.getObject(title, fromArray));	
			}			
		}				
	}
}

/**
	Funkce nastaví počáteční lokaci levelu
	param@level --object
*/

Game.prototype.setStartPlace = function(level){
	this.actualPlace = this.getObject(level.startPlace, "arrayOfPlaces");	
}
/**
	Funkce nastaví konečnou lokaci levelu
	pro zjištění, kdy načíst další level
	param@level --object
*/
Game.prototype.setEndPlace = function(level){
	this.endPlace = this.getObject(level.endPlace, "arrayOfPlaces");
}
/**
	Funkce vrátní aktuální pozici
*/
Game.prototype.getActualPlace = function(){
	return this.actualPlace;
}

/**
	nastaví novou místnost
*/
Game.prototype.setActualPlace = function(newPlace){
	this.actualPlace = newPlace;
}

/**
	Initicalizování příkazů použitých v levelu
	Vytvoření instací objektů příkazů a registrování příkazů do pole příkazů
	param@level --object
*/

Game.prototype.initCommands = function(level){
	var i;	

	for(i = 0; i < level.commands.length; i+=1){


		if(level.commands[i].title === "jdi"){
			this.command.registerCommand(new CommandGo(level.commands[i].description, this, this.state));
		}else if(level.commands[i].title === "coje"){
			this.command.registerCommand(new CommandWhat(level.commands[i].description, this, this.inventory));
		}else if(level.commands[i].title === "seber"){
			this.command.registerCommand(new CommandTake(level.commands[i].description, this, this.inventory));
		}else if(level.commands[i].title === "poloz"){
			this.command.registerCommand(new CommandPut(level.commands[i].description, this, this.inventory));
		}else if(level.commands[i].title === "pouzij"){
			this.command.registerCommand(new CommandUse(level.commands[i].description, this, this.inventory, this.state));
		}else if(level.commands[i].title === "mluv"){
			this.command.registerCommand(new CommandSpeak(level.commands[i].description, this));
		}else if(level.commands[i].title === "vloz_kod"){
			this.command.registerCommand(new CommandCode(level.commands[i].description, this, this.state));
		}else if(level.commands[i].title === "konec"){
			this.command.registerCommand(new CommandEnd(level.commands[i].description));
		}else if(level.commands[i].title === "pomoc"){
			this.command.registerCommand(new CommandHelp(level.commands[i].description, this, this.command));			
		}else if(level.commands[i].title === "nova_hra"){
			this.command.registerCommand(new CommandNewGame(level.commands[i].description, this, this.command));			
		}
	}
}
/**
	pridani ocekavanych stavu do pole aktivinich stavu
*/
Game.prototype.initStates = function(level){
	var i, st;
	for(i = 0; i < level.states.length; i+=1){

		if(window[level.states[i].title] !== undefined){
			st = new window[level.states[i].title](level.states[i]);			
			this.state.addState(st);	
			
			if(st.onStatePanel && st.active){
				this.answer.addState(st);
			}
			
		}

	}
}

/**
	Funkce reagující na uživatelský vstup
	ověření, jestli existuje použitý příkaz
	ověření, jestli existují zadané parametry

	param@input -- string

*/
Game.prototype.start = function(input){
	var cmd, inputT;
	
	inputT = input.toLowerCase();
	inputT = input.trim();
	var inputArray = inputT.split(" ");
	if(this.command.checkCommand(inputArray[0])){
		cmd = this.command.getCommand(inputArray.shift());
	}

	if(this.end && !(cmd instanceof CommandNewGame)){		
		return;
	}else if(this.end && cmd instanceof CommandNewGame){
		this.notifyAnswer("", ">>" + "<b>" +input + "</b>");
		this.endGame(cmd);
		return;
	}
	this.notifyAnswer("", ">>" + "<b>" +input + "</b>");
	
	if(cmd){
		if(cmd.checkParams(inputArray)){
			if(cmd.checkParameter(inputArray)){
				cmd.execute(inputArray);
			}
		}else{
		}
	}else{
		this.notifyAnswer(this, "wrongCmd");
	}

}

/**
	Metoda zajišťuje konec hry (smrt, příkaz konec, příkaz nová hra)
*/

Game.prototype.endGame = function(cmd){

	
	if(cmd instanceof CommandEnd){
		this.notifyAnswer(this, "wrongEpilogEnd");
		this.notifyAnswer(this, "end");
		this.end = true;
		
	}else if (cmd instanceof Terminal){
		this.notifyAnswer(this, "end");
		this.end = true;
	}
	else if(cmd instanceof CommandNewGame) {	
		this.end = false;	
		location.reload();				
	}else if(cmd instanceof SpaceSuit) {	
		this.end = true;
	}
}

/**
	Vrací pole všech místností
*/
Game.prototype.getPlaces = function(){
	return this.arrayOfPlaces;
}
/**
	Vrací pole všech věcí
*/
Game.prototype.getThings = function(){
	return this.arrayOfThings;
}
/**
	Vrací pole všech postav
*/
Game.prototype.getPersons = function(){
	return this.arrayOfPersons;
}
/**
	zmeni observery pro aktualni mistnosti
*/
Game.prototype.changeObserversTakePut = function(newPlace){
	var cmdTake = this.command.getCommand("seber");
	cmdTake.removeObserver(this.actualPlace);
	cmdTake.addObserver(newPlace);


	var cmdPut = this.command.getCommand("poloz");
	cmdPut.removeObserver(this.actualPlace);
	cmdPut.addObserver(newPlace);
	
}

/**
	incializovani observeru
*/
Game.prototype.initObservers = function(){
	var i, commands = this.command.getCommandsArray();
	
	for(i = 0; i < commands.length; i+=1){
		commands[i].addObserverAnswer(this.answer);
	}
	
	var cmdGo = this.command.getCommand("jdi");
	var cmdTake = this.command.getCommand("seber");
	var cmdPut = this.command.getCommand("poloz");
	var cmdUse = this.command.getCommand("pouzij");	

	this.addObservers("jdi", [this, this.answer]);
	this.addObservers("konec", [this]);
	this.addObservers("nova_hra", [this]);
	this.addObservers("seber", [this.inventory, this.actualPlace]);
	this.addObservers("poloz", [this.inventory, this.actualPlace]);
	this.inventory.addObserverAnswer(this.answer);
	this.addObserverAnswer(this.answer);
	

	var i, j, states = this.state.getAllStates();

	for(i = 0; i < states.length; i+=1){
		cmdGo.addObserver(states[i]);
		cmdPut.addObserver(states[i]);
		cmdTake.addObserver(states[i]);
		cmdUse.addObserver(states[i]);
		states[i].addObserverAnswer(this.answer);
		states[i].addObserver(this);
	}

	for(i = 0; i < this.arrayOfPlaces.length; i+=1){
		for(j = 0; j < states.length; j+=1){
			states[j].addObserver(this.arrayOfPlaces[i]);
		}		
	}


	this.update = function(cmd, input){		
		if(cmd instanceof CommandGo && input instanceof Place && typeof input.title === "string"){
			this.changeObserversTakePut(input);
			this.actualPlace = input;
		}else if(cmd instanceof CommandEnd || cmd instanceof Terminal && input === "konec" || input === "end"){
			this.endGame(cmd);
		}else if(this.state.getStateByArgs(cmd)){	
			this.updateStates(cmd, input);
		}else if(cmd instanceof CommandNewGame && input === "nova_hra"){
			this.endGame(cmd);
		}
	}
}

/**
	Metoda ma za ukol priradit pozorovatele zadanemu prikazu
	Factory method

*/
Game.prototype.addObservers = function(command, array){
	var i, cmd;
	cmd = this.command.getCommand(command);
	for(i = 0; i < array.length; i+=1){
		cmd.addObserver(array[i]);
	}

}

Game.prototype.updatePanelStates = function(){
	this.answer.updateStatePanel("","");
}



Game.prototype.updateStates = function(state, input){
	var i,j, states, commands;
	command = this.command.getCommandsArray();
	states = this.state.getAllStates();
	for(i = 0; i < states.length; i+=1){
		if(states[i].removeOn === state.removeOn || states[i].removeOn.indexOf(input) > -1){
			
			if(states[i].args !== state.args){
				states[i].updateState("remove");
			}			
			this.removeObserverForAllCmd(states[i]);
			this.state.removeState(states[i]);					
			i-=1;
		}
		if(states[i] !== undefined && states[i].hasOwnProperty("addOn") && states[i].addOn === input){
			states[i].updateState(input);
		}
	}
}

Game.prototype.removeObserverForAllCmd = function(state){
	var i,
	command = this.command.getCommandsArray();
	for(i = 0; i < command.length; i+=1){
		if(command[i].hasOwnProperty("removeObserver")){
			command[i].removeObserver(state);
		}		
	}
}