/**
	Stav, ktery ma za ukol reagovat na prikazy a menit hodnotu vzduchu ve hracove skafandru
*/

function SpaceSuit(args){
	this.args = args;
	this.state = 100;
	this.msg = args.msg;
	this.active = args.active;	
	this.title = args.title;
	this.onStatePanel = args.onStatePanel;

	this.positiveAnswer = args.positiveAnswer;
	this.negativeAnswer = args.negativeAnswer;
	this.removeOn = args.removeOn.split(",");

	extend(this, new Observer());
	extend(this, new Subject());
	extend(this, new SubjectAnswer());

	// instance prikazu, instance veci
	this.update = function(cmd, input){
		if(cmd instanceof CommandGo){
			this.setState(this.state - 10);
		}else{
			if(cmd instanceof CommandUse && input.title === "kompresor"){

				this.setState(100);
				this.notifyAnswer(this, "Vzduch ve skafandru doplněn na " + this.state + "%");		
							
				return;	
			}else if (cmd instanceof CommandUse || cmd instanceof CommandTake || cmd instanceof CommandPut){
				this.setState(this.state - 5);
			}	
		}
		this.checkState();
	}
}

SpaceSuit.prototype.updateState = function(remove){
	if(remove !== undefined){		
		this.changeState();
		this.notifyAnswer("", this.positiveAnswer);
		this.notifyAnswer(this, "removeState");	
	}
	
}

SpaceSuit.prototype.getState = function(){
	return this.state;
}

SpaceSuit.prototype.setState = function(state){
	this.state = state;
}

/**
	Metoda slouzi k overeni stavu skafandru a nasledne posladni odpovedi
*/
SpaceSuit.prototype.checkState =function(){
	if(this.state <= 0){
		this.notifyAnswer(this, "Vzduch ve skafandru: " + this.state + "%");
		this.notifyAnswer("", "Došel vám vzduch ve skfandru a vy jste umřel. Prohrál jste. Děkujeme že jste si hru zahráli.");
		this.notify(this, "end");
	}else{
		this.notifyAnswer(this, "Vzduch ve skafandru: " + this.state + "%");
	}
}

/**
	Metoda reaguje na příkaz pouzij kompresor v mistnosti hangar
	slouzi k doplneni vzduchu
	vraci odpovedi podle stavu skafandru
*/
SpaceSuit.prototype.react = function(thing, place, t3){
	var ans = "";
	if(thing === "kompresor" && place === "hangar" && t3 !== "dvere"){
		if(this.state == 100) {
			ans = "Vzduch ve skafandru je už na maximalní hodnotě."
			this.notifyAnswer(this, ans);			
		}else{
			this.setState(100);
			ans = "Vzduch ve skafandru doplněn na " + this.state + "%.";
			this.notifyAnswer(this, ans);		
		}
		
		return ans;
	}
}

SpaceSuit.prototype.changeState = function(){
	if(this.active){
		this.active = false;
	}else{
		this.active = true;
	}
}

/**
	Stav urcujici zapnutou/vypnutou elektrinu
*/
function Electricity(args){

	this.args = args;
	this.active = args.active;	
	this.title = args.title;
	this.msg = args.msg;
	this.positiveAnswer = args.positiveAnswer;
	this.negativeAnswer = args.negativeAnswer;
	this.removeOn = args.removeOn.split(",");
	this.onStatePanel = args.onStatePanel;
	extend(this, new Observer());
	extend(this, new Subject());
	extend(this, new SubjectAnswer());

	this.update = function(cmd, input){	

	}
}

Electricity.prototype.react = function(thing, place, t3){
	if(String(thing) === String(this.removeOn) && place === "strojovna" && t3 !== "dvere"){
		if(String(thing) === String(this.removeOn)){						
			return this.positiveAnswer;
		}else{
			this.notifyAnswer(this, "Elektřina: vypnutá");
			return false;
		}
	}
	return false;
}

Electricity.prototype.getState = function(){
	return this.state;
}

Electricity.prototype.updateState = function(remove){	
	this.changeState();
	this.notify(this, "ElectricityOn");
	this.notifyAnswer(this, "Elektřina: zapnutá");
}
Electricity.prototype.changeState = function(){
	if(this.active){
		this.active = false;
	}else{
		this.active = true;
	}
}

/**
	Stav, ktery vytvari prekazku mezi mistnostmi
	Stav reaguje na ruzne podmeny - rozbiti sekerou/pacidlem nebo vypnuti elektriny
	Reagujici podnet je uloz ve vlastnosti removeOn
*/

function Doors(args){
	
	this.args = args;
	this.active = args.active;	
	this.title = args.title;
	this.removeOn = args.removeOn.split(",");	
	this.place1 = args.place1;
	this.place2 = args.place2;
	this.addOn = args.addOn;
	this.negativeAnswer = args.negativeAnswer;
	this.positiveAnswer = args.positiveAnswer;
	this.onStatePanel = args.onStatePanel;
	extend(this, new Observer());
	extend(this, new Subject());
	extend(this, new SubjectAnswer());

	this.update = function(cmd, input){

//	this.returnAnswer();		
	}
}

Doors.prototype.getState = function(){
	return this.state;
}

/**
	Metoda reaguje na příkaz jdi a pouzij
	parametry jsou bud actualni mistnost, dalsi mistnost
	nebo vec, aktualni mistnost, "dvere"
*/

Doors.prototype.react = function(actualPlace, newPlace, doors){
	
	if((String(actualPlace) === String(this.place1) && String(newPlace) === String(this.place2)) ||
		(String(actualPlace) === String(this.place2) && String(newPlace) === String(this.place1))){		
		return "Do místnosti " + newPlace + " nelze projít" + this.returnAnswer();	
	}
	if((this.removeOn.indexOf(actualPlace) > -1 && doors === "dvere" &&
		(this.place1 === newPlace || this.place2 === newPlace)) ||
	 ((this.removeOn.indexOf(actualPlace) > -1 && 
		(this.place1 === newPlace || this.place2 === newPlace)))){
			
		this.notify(this, this.removeOn[this.removeOn.indexOf(actualPlace)]);
		this.changeState();
		return this.returnAnswer();
	}

	return false;

}
Doors.prototype.returnAnswer = function(){
	if(this.active){
			return this.negativeAnswer;	
		}else{
			return this.positiveAnswer;
		}
}

Doors.prototype.changeState = function(){
	if(this.active){
		this.active = false;
	}else{
		this.active = true;
	}
}

Doors.prototype.updateState = function(remove){	
	this.changeState();
	
}


/**
	Stav zachycujici udalost vlozeni kodu
*/
function Terminal(args){
	
	this.args = args;
	this.active = args.active;	
	this.title = args.title;
	this.removeOn = args.removeOn.split(",");	
	this.place1 = args.place1;
	this.addOn = args.addOn;
	this.negativeAnswer = args.negativeAnswer;
	this.positiveAnswer = args.positiveAnswer;
	this.onStatePanel = args.onStatePanel;
	extend(this, new Observer());
	extend(this, new Subject());
	extend(this, new SubjectAnswer());

	this.update = function(cmd, input){

//	this.returnAnswer();		
	}
}

Terminal.prototype.react = function(cmd, place, generatedCodes, input){
	if(cmd instanceof CommandCode){

		if(place.title === this.place1 && generatedCodes instanceof Codes){
			if(this.decrypt(input, generatedCodes)){
				return true;		
			}else{
				this.notifyAnswer(this, "wrongPlaceCode");
			}	
		}else{
			return this.negativeAnswer;
		}
	}	
	return false;

}

/**
	Metoda, ktera porovna a zadane kody a desifrovane

¨*/
Terminal.prototype.decrypt = function(input, Codes){
	var m = 2;
	var marsDec = this.decryptCode(Codes.Mars.code);
	var titanDec = this.decryptCode(Codes.Titan.code);
	var earthDec = this.decryptCode(Codes.Zeme.code);

	if(input === marsDec){
		this.notifyAnswer(this, Codes.Mars.description);
		return true;
	}

	if(input === titanDec){
		this.notifyAnswer(this, Codes.Titan.description);		
		return true;
	}
	if(input === earthDec){
		this.notifyAnswer(this, Codes.Zeme.description);
		this.notify(this,"end");
		return true;
		 
	}
	return false;

}

/**
	Metoda, ktera desifruje a zadane kody
¨*/

Terminal.prototype.decryptCode = function(code){
	var m = 2, i, len = code.length, c = "", ch;

	for(i = 0; i < len; i+=1){
		ch = code[i].charCodeAt(0);
		if(ch >= 48 && ch < 58){
			m = 1;
		}else{
			m = 2;
		}

		ch += m ; 		
		if(ch > 57 && ch < 65){
			ch = (ch - 57) + 47;
		}else if(ch > 90){
			ch = (ch - 90) + 64;
		}
		c+= String.fromCharCode(ch);
	}

	return c.toLowerCase();
}


Terminal.prototype.changeState = function(){
	if(this.active){
		this.active = false;
	}else{
		this.active = true;
	}
}

Terminal.prototype.updateState = function(remove){	
	this.changeState();
	
}

Terminal.prototype.checkCodes = function(codes){	
	this.changeState();
	
}
/**
	Stav reagujici na vlozeni bateie do manualu
*/
function Manual(args){
	
	this.args = args;
	this.active = args.active;	
	this.title = args.title;
	this.removeOn = args.removeOn.split(",");	
	this.place1 = args.place1;
	this.addOn = args.addOn;
	this.negativeAnswer = args.negativeAnswer;
	this.positiveAnswer = args.positiveAnswer;
	this.onStatePanel = args.onStatePanel;
	extend(this, new Observer());
	extend(this, new Subject());
	extend(this, new SubjectAnswer());


	this.update = function(cmd, input){

	}
}
/**
	Metoda reaguje na příkaz použij - parametry baterie manual
	param@ string
*/
Manual.prototype.react = function(t1, t2){

	if((t1 === this.addOn && t2 === this.title.toLowerCase()) ||
		(t1 === this.title.toLowerCase() && t2 === this.addOn)){
		this.changeState();	
		this.notify(this, "manual");
		return this.positiveAnswer;
	}else if(t1 === this.title.toLowerCase()){
		return this.negativeAnswer;
	}
	return false;
}

Manual.prototype.changeState = function(){
	if(this.active){
		this.active = false;
	}else{
		this.active = true;
	}
}

Manual.prototype.updateState = function(remove){}
/**
	Stav, ktery drzi informace o kodech
*/
function Codes(args){
	
	this.args = args;
	this.active = args.active;	
	this.title = args.title;
	this.removeOn = args.removeOn.split(",");	
	this.Mars = args.Mars;
	this.Titan = args.Titan;
	this.Zeme = args.Zeme;
	this.addOn = args.addOn;
	this.onStatePanel = args.onStatePanel;
	this.msg = "Kódy vysílání: "+"</br>"+"Mars: " + this.Mars.code +"</br>Titan: "+this.Titan.code+"</br>Zeme: "+this.Zeme.code;
	extend(this, new Observer());
	extend(this, new Subject());
	extend(this, new SubjectAnswer());

	this.update = function(cmd, input){
		
	}
}

Codes.prototype.react = function(t1, t2){
	
	return false;
}

Codes.prototype.getCodes = function(){
	return [this.Mars, this.Titan, this.Zeme];
}

Codes.prototype.changeState = function(){
	if(this.active){
		this.active = false;
	}else{
		this.active = true;
	}
}

Codes.prototype.updateState = function(input){	
		if(input === this.addOn){
			this.changeState();
			this.notifyAnswer(this, "addState");	
		}
}