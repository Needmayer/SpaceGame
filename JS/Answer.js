var Answer = function(){
	this.wrongCmd = "Takový příkaz neexistuje.";
	this.wrongParamCountOne = "Tento příkaz přijímá jeden parametr.";
	this.wrongParamOneTwo = "Tento příkaz přijímá jeden nebo dva parametry.";
	this.wrongParamCountNone = "Tento příkaz nevyžaduje žádný parametr.";
	this.wrongParamCountNoneOne = "Tento příkaz nevyžaduje žádný nebo jeden parametr";
	this.wrongWhatParam = "Tento příkaz vyžaduje parametr 'tady' nebo 'batoh'.";
	this.wrongParamHelp = "Parametrem příkazu 'pomoc' může být pouze název věci, místnosti, osoby, příkazu nebo parametr prikazy pro vypsání popisu všech příkazů.";	

	this.help = "Vaším úkolem je obnovit radiové spojení se Zemí na vesmírné vědecké základně. Hra se ovládá textovými příkazy. Mezi místnostmi se pohybujete přikazem 'jdi' (například 'jdi chodba1'). Máte k dispozici více příkazů, které zobrazíte příkazem 'pomoc prikazy'."
	this.helpNext = "Informace o věcech v místnostech zobrazíte zadáním příkazu - pomoc 'vec'.<br>Informace o místnosti zobrazíte příkazem - pomoc 'mistnost'.<br>Informace o osobách zobrazíte příkazem - pomoc 'osoba'.<br>Informace o jednotlivých příkazech zobrazíte příkazem - pomoc 'prikaz'.<br>Informace o všech dostupných příkazech zobrazíte příkazem - pomoc prikazy."

	this.descCommand = "Příkaz";
	this.descThing = "Věc ";
	this.descPlace = "Místnost ";
	this.descPerson = "Osoba ";
	this.descAllCommands = "Příkazy ";

	this.wrongExit = "Tato místnost nemá takový východ.";
	this.wrongSamePlace = "V této místnosti se již nacházíte.";
	this.goAnswerPlace = "Jste v místnosti: ";
	this.goAnswerExists = "Místnost má tyto východy: ";

	this.wrongNoThingPlaceInv = "není v místnosti ani v batohu.";
	this.wrongThingNotInPlace = "Tato věc není v místnosti.";
	this.thingsInPlace = "V místnosti jsou tyto věci:";
	this.wrongPlaceIsEmpty = "V této místnosti nejsou žádné věci.";

	this.thingsInInventory = "V batohu jsou tyto věci: ";
	this.wrongThingNotInInvetory = "Tato věc není v batohu.";
	this.wrongThingNotTransferable = "Tato věc není přenositelná.";
	this.wrongFullBackpack = "Batoh je již plný. Více věcí se do něj nevejde.";
	this.wrongBackpackIsEmpty = "Batoh je prázdný.";
	this.wrongThingTooHeavy = "Tato věc je příliš těžká a už se nevejde do batohu.";

	this.wrongThingNotUsable = "nelze použít.";
	this.wrongThingNotUsableWay = "nelze takto použít.";

	this.thigUsed = "Použil jste věc";

	this.welcome = "Vítejte</br></br>Vaším úkolem je obnovit radiové spojení na vesmírné vědecké základně. Po přistání jste zjistili, že na základně nefunguje podpora života, a proto se po ní musíte pohybovat ve skafandru, ve kterém je omezená zásoba vzduchu. Napište 'pomoc', pokud si nevíte rady, jak hrát dál.";
	this.wrongEpilogEnd = "Hra byla ukončena příkazem 'konec'. ";

	this.wrongNoNeedSpaceSuit = "Podpora života se spustila a vy nemusíte nadále nosit skafandr.";

	this.wrongNoPerson = "V této místnosti se taková osoba nenachází.";
	this.speak = "Promluvil jste si s osobou: ";

	this.wrongPlaceCode = "Zadal jste kód, ale vysílačka jen chrčí. Asi máte špatný kód frekvence.";
	this.end = "Pokud chcete hrát znovu, použijte příkaz 'nova_hra'. Děkuji, že jste si hru zahráli.";
	this.codeMars = "";
	this.codeTitan = "";
	this.codeEarth = "";

	this.thing = "Věc";
	this.addToInventory = "byla přidána do batohu.";
	this.removeFromInventory = "byla vyndána z batohu.";

	extend(this, new Observer());
	extend(this, new ObserverAnswer());

	this.states =[];

	this.mainWindow = document.getElementById("mainWindow");
	this.statePanel = document.getElementById("statePanel");
	this.span = document.getElementById("hiddenSpan");


	this.com = "";

	this.update = function(cmd, msg){
		var answ = "", titles = "";		
		if(cmd instanceof CommandGo){
			if(msg instanceof Place){
				titles = this.createTitleMSG(msg);
				answ += this.goAnswerPlace + " " + msg.title + "</br>" + msg.description + "</br>" + this.goAnswerExists + titles;
				this.appendAnswer(answ);
			}
		}
	}

	this.updateAnswer = function (cmd, msg, obj) {
		var ans = "";
		if(msg === "removeState"){
			this.removeState(cmd);
			return;
		}
		if(msg ==="addState"){
			this.addState(cmd);
			return;
		}
		if(msg === "end" && cmd instanceof Game){
			this.appendAnswer(this[msg]+"</br>");
			return;
		}

		if((typeof cmd === "string" && msg.indexOf("wrong") === -1 && this[msg] !== undefined) ||
			(typeof cmd !== "string" && msg.indexOf("wrong") > -1 && this[msg] !== undefined)){

				if(cmd instanceof CommandUse && obj !== undefined){
					ans += this.thing + " " + obj + " " + this[msg] +"</br>";
					this.appendAnswer(ans);
				}else{
					this.appendAnswer(this[msg]+"</br>");	
				}
				
		}else if(cmd instanceof CommandGo){
			
				this.appendAnswer(msg +"</br>");
			
		}else if(cmd instanceof CommandTake){

			ans += this.thing + " " + msg + " " + this.addToInventory;
			this.appendAnswer(ans + "</br>");
		}else if(cmd instanceof CommandPut){
			ans += this.thing + " " + msg + " " + this.removeFromInventory;
			this.appendAnswer(ans + "</br>");

		}else if(cmd instanceof CommandWhat){
			if(String(cmd.param) === "tady"){
				if(msg.length === 0){
					this.appendAnswer(this["wrongPlaceIsEmpty"] + "</br>");
				}else{
					this.appendAnswer(this["thingsInPlace"] + "</br>" + this.createTitleMSG(msg));
				}
			}else if(String(cmd.param) ==="batoh"){
				if(msg.length === 0){
					this.appendAnswer(this["wrongBackpackIsEmpty"] + "</br>");
				}else{
					this.appendAnswer(this["thingsInInventory"] + "</br>" + this.createTitleMSG(msg));
				}
			}
		}else if(cmd instanceof CommandEnd){

		}else if(cmd instanceof CommandUse){
			ans += this.thigUsed + " " +obj +"</br>" + msg;
			this.appendAnswer(ans + "</br>");
		}else if(cmd instanceof CommandSpeak){
			ans += this.speak + " " +obj.title +"</br>" + obj.answer + "</br>";
			this.appendAnswer(ans + "</br>");
		}else if(cmd instanceof CommandHelp){
			if(msg === "help"){
				ans += this.help + "<br><br>" + this.goAnswerPlace +""+ obj.title + "<br>" + this.goAnswerExists + obj.getTitles("exits") + "<br><br>" + this.helpNext;
			}else if(Array.isArray(obj)){
				ans += this[msg] + "</br>" + this.createInfoAnswerArray(obj);	
			}else{
				ans += this[msg] + "</br>" + this.createInfoAnswer(obj.getInfoAnswer());	
			}			
			this.appendAnswer(ans + "</br>");
		}else{	

			if(this.checkState(cmd)){
				this.updateStatePanel(cmd, msg);
			}else{
				this.appendAnswer(msg + "</br>");	
			} 
			
		}
	}
}

Answer.prototype.appendState = function (msg){
	this.com += msg + "</br>";
	this.mainWindow.value = this.com;
}

Answer.prototype.appendAnswer = function (msg){
	this.com += msg + "</br>";
	this.mainWindow.innerHTML = this.com;
	this.autoScroll();
}

Answer.prototype.updateStatePanel = function (cmd, msg){
	var i, answ = "";
	for(i = 0; i < this.states.length; i+=1){
		if(cmd === this.states[i]){
			this.states[i].msg = msg;
		}
		answ += this.states[i].msg + "</br></br>"; 
	}
	this.statePanel.innerHTML = answ;
}

Answer.prototype.checkState = function(cmd){
	var i; 
	for( i = 0; i < this.states.length; i+=1){
		if(this.states[i].args === cmd.args)return true;
	}
	return false;
}

Answer.prototype.createTitleMSG = function(obj){
	var titles = "", i, array;
	if(obj instanceof Place){
		array = obj.getTitles("exits");	
	}else{
		array = obj;
	}
	
	for(i = 0; i < array.length; i+=1){
		titles += "</br> - " + array[i];
	}

	return titles +  "</br>";

}

Answer.prototype.autoScroll = function(){

	$("#mainWindow").animate({scrollTop: $('#mainWindow').get(0).scrollHeight}, 0);

}
Answer.prototype.addState = function(state){
	if(typeof state === "object" && state.onStatePanel !== undefined){
		this.states.push(state);
		this.updateStatePanel("","");
	}
}

Answer.prototype.removeState = function(state){
	var i;
	if(typeof state === "object" && state.onStatePanel !== undefined){
		for(i = 0; i <this.states.length; i+=1){
			if(state.args === this.states[i].args){
				this.states.splice(i, 1);
				this.updateStatePanel();
			}
		}
	}
}

Answer.prototype.createInfoAnswer = function(obj){
	var i, info = "", objAns;
	for(i in obj){
		objAns = obj[i];
		if(obj[i] === false ) objAns = "ne";
		else if(obj[i] === true) objAns = "ano";
		info += i + ": " + objAns + " </br>";
	}
	return info;
}

Answer.prototype.createInfoAnswerArray = function(objA){
	var i,j, info = "", objAns, obj;
	for(j =0; j <objA.length; j +=1){
		obj = objA[j].getInfoAnswer();
		for(i in obj){
			objAns = obj[i];
			if(obj[i] === false ) objAns = "ne";
			else if(obj[i] === true) objAns = "ano";
			info += i + ": " + objAns + " </br>";
		}
		info += "</br>";
	}
	return info;	
}