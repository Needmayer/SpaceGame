describe('Game', function() {

	var start, game, level;

	this.level = new Level();

	beforeEach(function() {
		this.start = {

  		"places": [
  			["hangar",{"default" : "Hangár, kde jste přistáli se svou lodí."}],
  			["chodba1",{"default" : "Chodba pokračuje dál vlevo. Napravo jsou jedny dveře."}],
  			["sklad", {"default" : "Je zde spousta věcí na sebrání."}],
  			["chodba2", {"default" : "Po obou stranách chodby jsou 2 dveře. Na konci chodby jsou ještě jedny dveře."}],
  			["laborator1",{"default" : "Všude se povalují nějaké zkumavky."}], 
  			["laborator2", {"default" : "Jen samé přístroje."}],
  			["pokoj", {"default" : "Po pokoji pomateně jezdí robot. Zkus si s ním promluvit."}],
  			["strojovna",{"default" : "Uvnitř je generátor na výrobu elektřiny, ale není puštěný.",
  									"ElectricityOn" : "Generátor běží. Světla svítí. Vzduch proudí."}], 
  			["vypocetni_centrum", {"default" : "Místnost je plná počítačů. Očividně jsou bez elektřiny.",
  											"ElectricityOn" : "Elektřina funguje. Vše hučí a bzučí."}],
  			["udrzbarna", { "default" : "Skafandry, čistící prostředky, roboti na uklízení a jiné věci."}],
  			["vetraci_sachta", {"default" : "Uvnitř je velký větrák, naštěstí se netočí a vy prolezete."}],
  			["ridici_centrum",{"default" : "Stroje na řízení celé základny a je zde i vysílačka, do které můžete zadat kód."}]
  		],

 		"things": [
			["sekera", 1, true, true, "Záchranářská sekera."],
			["pacidlo", 1, true, true, "Železné páčidlo."],
			["baterie", 1, true, true, "Náhradní baterie."],
			["manual", 1, true, true, "Elektronický tablet se seznamem frekvencí."],
			["vesta", 1, false, true, "Je to horní díl uniformy."],
			["krabice", 3, false, true,"Středně velká dřevěná krabice."],
			["plechovka", 1, false, true, "Je to stará plechovka s fazolemi."],
			["zkumavka", 1, false, true, "Prázdná skleněná zkumavka."],
			["miska", 1, false, true, "Prázdná plastová miska."],
			["tryska", 5, false, true, "Náhradní tryska do motoru lodi."],
			["dvere", 1, true, true," Zamčené dřevěné dveře" ],

			["generator", 80, true, false, "Očividně pro výrobu elektřiny."],
			["kompresor", 80, true, false, "Pro doplnění vzduchu."]
			
		],
		"persons" :[
			["robot", "Porouchaný robot", "Robot je očividně porouchaný a jen cosi blekotá:...A je C je E, 0 je 1 je 2 a to opakuje pořád dokola."]
		],

		"exitsAndThings": {
			"hangar": { "exits": ["chodba1"],
			            "things" : ["kompresor"],
			        	"persons" : []},
			"chodba1": {"exits": ["hangar", "sklad", "chodba2"],
			            "things": [],
			        	"persons" : []},
			"sklad": {"exits": ["chodba1"],
			            "things": ["baterie", "sekera", "plechovka", "vesta", "krabice", "tryska"],
			        	"persons" : []},
			"chodba2": {"exits": ["chodba1","vypocetni_centrum", "laborator1", "laborator2", "pokoj", "ridici_centrum"],
			            "things": [],
			        	"persons" : []},
			"vypocetni_centrum": {"exits": ["chodba2","vetraci_sachta", "strojovna"],
			            "things": [],
			        	"persons" : []},
			"laborator1": {"exits": ["chodba2"],
			            "things": ["miska"],
			        	"persons" : []},
			"laborator2": {"exits": ["chodba2"],
			            "things": ["zkumavka"],
			        	"persons" : []},
			"strojovna": {"exits": ["vypocetni_centrum", "udrzbarna"],
			            "things": ["generator"],
			        	"persons" : []},
			"udrzbarna": {"exits": ["vetraci_sachta", "strojovna"],
			            "things": ["pacidlo"],
			        	"persons" : []},
			"vetraci_sachta": {"exits": ["vypocetni_centrum", "udrzbarna"],
			            "things": ["generator"],
			        	"persons" : []},
			"pokoj": {"exits": ["chodba2"],
			            "things": [],
			        	"persons" : ["robot"]},
			"ridici_centrum": {"exits": ["chodba2"],
			            "things": ["manual"],
			        	"persons" : []}
			
		},  		
		"startPlace": "hangar",
		"endPlace": "chodba1",
		"commands": [
			{"title" : "jdi", "description" : "Příkazem jdi se můžete pohybovat mezi místnostmi. Příkaz vyžaduje 1 parametr. Příklad 'jdi mistnost'"},
		 	{"title" : "coje", "description" : "Příkazem zjistíte, co se nachází v místnosti nebo v batohu. Vyžaduje 1 parametr (tady, batoh). Příklad 'coje batoh'"},
		  	{"title" : "seber", "description" : "Příkaz seber vloží věc do batohu a odebere ji z místnosti. Příkaz vyžaduje 1 parametr. Příklad 'seber vec'"},
		 	{"title" : "poloz", "description" : "Příkaz poloz vloží věc z batohu do místnosti. Příkaz vyžaduje 1 parametr. Příklad 'poloz vec'"},
		 	{"title" : "pouzij", "description" : "Příkazem použijete použitelnou věc. Případně použijete jednu věc na druhou. Příkaz vyžaduje 1 - 2 parametry. Příklad 'pouzij vec' nebo 'pouzij vec naVec'"},
		 	{"title" : "mluv", "description" : "Příkazem můžete komunikovat s osobami. Vyžaduje 1 parametr. Příklad 'mluv osoba'"},
		 	{"title" : "vloz_kod", "description" : "Příkazem můžete vložit kód od vysílačky. Vyžaduje 1 parametr. Příklad 'vloz_kod kod'"},
		 	{"title" : "konec", "description" : "Příkaz konec ukončí hru. Příkaz je bezparametrový"},
		 	{"title" : "pomoc", "description" : "Příkaz pomoc bez parametrů vypíše cíl hry, v jaké se nacházíte místnosti a jaké má tato místnost východy + jaké máte k dispozici příkazy. Můžete zadat 1 parametr (název věci, příkazu) a tím vypíšete popis o parametru. Příklad 'pomoc pomoc'"}
	],		
		"states" : [
		
			{"title" :"SpaceSuit",  "onStatePanel" : true, "msg" : "Vzduch ve skafandru: 100%", "active": true, "removeOn" : "ElectricityOn", "positiveAnswer": "Elektřina je zapnutá, podpora života běží a vy už nemusíte dál nosit skafandr." },
			{"title" :"Electricity","onStatePanel": true, "msg" : "Elektřina je vypnutá", "active": true, "removeOn" : "generator", "positiveAnswer":"Všechny stroje kolem se zapnuly. Elektřina je zapnutá."},
		
			{"title" :"Doors","onStatePanel": false, "active": true,  "addOn" : "", "removeOn" : "sekera,pacidlo", "place1" :"vypocetni_centrum", "place2" : "strojovna",		"negativeAnswer": "Do místnosti strojovna nelze projít, protože dveře mezi místnotmi jsou zaseknuté. Zkuste je rozbít.","positiveAnswer": "Jednou ranou jste dveře otevřel."},
			{"title" :"Doors","onStatePanel": false, "active": true,  "addOn" : "", "removeOn" : "ElectricityOn", "place1" :"chodba2",			 "place2" : "ridici_centrum",	"negativeAnswer": "Do místnosti vedou elektrické dveře a nelze je otevřít. Zapněte nejprve elektřinu.", "positiveAnswer": "Dveře se samy otevřeli a vy můžete projít."},
			{"title" :"Doors","onStatePanel": false, "active": true,  "addOn" : "", "removeOn" : "ElectricityOn", "place1" :"chodba2", 		 	 "place2" : "pokoj",			"negativeAnswer": "Do místnosti vedou elektrické dveře a nelze je otevřít. Zapněte nejprve elektřinu.", "positiveAnswer": "Dveře se samy otevřeli a vy můžete projít."},
			{"title" :"Doors","onStatePanel": false, "active": false, "addOn" : "ElectricityOn", "removeOn" : "", "place1" :"udrzbarna", 		 "place2" : "vetraci_sachta",	"negativeAnswer": "Elektřina je zapnutá a větrák se rychle otáčí. Tudy nelze prolézt.", "positiveAnswer": "Ve větrací šachtě je větrák, který se netočí a vy můžete prolézt."},
			{"title" :"Doors","onStatePanel": false, "active": false, "addOn" : "ElectricityOn", "removeOn" : "", "place1":"vypocetni_centrum", "place2" : "vetraci_sachta",	"negativeAnswer": "Elektřina je zapnutá a větrák se rychle otáčí. Tudy nelze prolézt.", "positiveAnswer": "Ve větrací šachtě je větrák, který se netočí a vy můžete prolézt."},
			{"title" :"Terminal","onStatePanel": false, "active": true, "addOn" : "", "removeOn" : "", "place1":"ridici_centrum", "negativeAnswer": "V této místnosti se nenachí žádný terminál, do kterého by šlo zadat kód."},
			{"title" :"Manual","onStatePanel": false, "active": true, "addOn" : "baterie", "removeOn" : "", "place1":"ridici_centrum", "negativeAnswer": "Manuál ma očividně vybitou baterii. Zkeste najít náhradní.", "positiveAnswer" : "Po vložení baterie se manuál spustil a zobrazil vysílací kódy."},
			{"title" :"Codes","onStatePanel": true, "active": false, "addOn" : "manual", "removeOn" : "", "Mars" : {"code" : "AAAAA", "description" : "Spojil jste se s Marsem. Rozhovor byl krátce na to ukončen."}, "Titan" : { "code" : "BBBBBBB", "description" : "Spojil jste se s Titanem. Rozhovor byl krátce na to ukončen."}, "Zeme" : { "code" : "CCCCCCCCCCCC", "description" : "Navázal jste spojení se Zemí. Splnil jste úkol."}}
		]
	}	
	
	this.game = new Game(false);
	this.game.loadLevel(null, this.start);
	this.arrayOfThings = [];
	this.arrayOfPlaces = [];
	this.arrayOfPersons = [];


	});

	/*testy
	loadLevel
	initThings
	initPlaces
	initPersons
	getObject
	fillPlaces
	starPlace
	endPlaces
	

	*/




	it('should load level', function() {
		this.game.loadLevel(null, this.start);
		expect(this.game.actualLevel).not.toBeFalsy();
		expect(typeof this.game.actualLevel).toEqual('object');
	});

	it('should init things from object to array', function() {
		this.game.initThings(this.start);
		expect(this.game.arrayOfThings[0].title).toEqual("sekera");
		expect(this.game.arrayOfThings[1].title).not.toEqual("kompresor");
		expect(this.game.arrayOfThings[1].title).toEqual("pacidlo");
		expect(this.game.arrayOfThings[2].title).not.toEqual("pacidlo");
		expect(this.game.arrayOfThings[2].title).toEqual("baterie");

		expect(this.game.arrayOfThings[2].weight).toEqual(1);
		expect(this.game.arrayOfThings[3].weight).toEqual(1);
		expect(this.game.arrayOfThings.length).toBe(13);

	});

	it('should init places from object to array', function() {		

		expect(this.game.arrayOfPlaces.length).toBe(0);
		this.game.initPlaces(this.start);
		expect(this.game.arrayOfPlaces[0].title).toEqual("hangar");
		expect(this.game.arrayOfPlaces[1].title).toEqual("chodba1");
		expect(typeof this.game.arrayOfPlaces[0]).toEqual("object");
		expect(typeof this.game.arrayOfPlaces[1]).toEqual("object");
		expect(this.game.arrayOfPlaces.length).toBe(12);
	});

	it('should init persons from object to array', function() {

		expect(this.game.arrayOfPersons.length).toBe(0);
		this.game.initPersons(this.start);
		expect(this.game.arrayOfPersons[0].title).toEqual("robot");		
		expect(typeof this.game.arrayOfPersons[0]).toEqual("object");		
		expect(this.game.arrayOfPersons.length).toBe(1);
	});

	it('should get object from array', function() {
		var obj = this.game.getObject("hangar", "arrayOfPlaces");
		expect(obj).toEqual(false);
		this.game.initPlaces(this.start);
		this.game.initPersons(this.start);
		this.game.initThings(this.start);
		obj = this.game.getObject("hangar", "arrayOfPlaces");
		expect(obj.title).toEqual("hangar");
		obj = this.game.getObject("chodba1", "arrayOfPlaces");
		expect(obj.title).toEqual("chodba1");
		expect(typeof obj).toEqual("object");
		obj = this.game.getObject("hangar", "arrayOfThings");
		expect(obj).toEqual(false);
		obj = this.game.getObject("nic", "arrayOfPlaces");
		expect(obj).toEqual(false);
		obj = this.game.getObject("robot", "arrayOfPlaces");
		expect(obj).toEqual(false);
		obj = this.game.getObject("robot", "arrayOfPersons");
		expect(obj.title).toEqual("robot");
		expect(typeof obj).toEqual("object");
		obj = this.game.getObject("postava", "arrayOfPersons");
		expect(obj).toEqual(false);
		obj = this.game.getObject("sekera", "arrayOfThings");
		expect(obj.title).toEqual("sekera");
		obj = this.game.getObject("baterie", "arrayOfThings");
		expect(obj.title).toEqual("baterie");
		expect(typeof obj).toEqual("object");
		obj = this.game.getObject("neco", "arrayOfThings");
		expect(obj).toEqual(false);

		obj = this.game.getObject("neco", "pole");
		expect(obj).toEqual(false);

	});

	it('should fill place object with things', function() {
		this.game.initPlaces(this.start);
		this.game.initThings(this.start);

		expect(this.game.arrayOfPlaces[0].things.length).toEqual(0);
		this.game.fillPlaces(this.start, "things", "things", "arrayOfThings");
		expect(this.game.arrayOfPlaces[0].things.length).toEqual(1);
		expect(this.game.arrayOfPlaces[0].things[0].title).toEqual("kompresor");

		expect(this.game.arrayOfPlaces[2].things[0].title).not.toEqual("pacidlo");
		expect(this.game.arrayOfPlaces[2].things[0].title).toEqual("baterie");
		expect(this.game.arrayOfPlaces[2].things.length).toEqual(6);
	});

	it('should fill place object with exits', function() {
		this.game.initPlaces(this.start);

		expect(this.game.arrayOfPlaces[0].exits.length).toEqual(0);
		this.game.fillPlaces(this.start, "exits", "exits", "arrayOfPlaces");
		expect(this.game.arrayOfPlaces[0].exits.length).toEqual(1);
		expect(this.game.arrayOfPlaces[0].exits[0].title).toEqual("chodba1");		
		expect(this.game.arrayOfPlaces[0].exits[0].title).not.toEqual("hangar");

		expect(this.game.arrayOfPlaces[1].exits[0].title).not.toEqual("chodba1");
		expect(this.game.arrayOfPlaces[1].exits[0].title).toEqual("hangar");
		expect(this.game.arrayOfPlaces[1].exits.length).toEqual(3);
	});

	it('should fill place object with persons', function() {
		this.game.initPlaces(this.start);
		this.game.initPersons(this.start);

		expect(this.game.arrayOfPlaces[0].persons.length).toEqual(0);
		this.game.fillPlaces(this.start, "persons", "persons", "arrayOfPersons");
		expect(this.game.arrayOfPlaces[0].persons.length).toEqual(0);		
		expect(this.game.arrayOfPlaces[1].persons.length).toEqual(0);

	});

	it('should set startPlace', function() {
		expect(this.game.actualPlace).toEqual(null);
		this.game.initPlaces(this.start);
		this.game.setStartPlace(this.start);

		expect(typeof this.game.actualPlace).toEqual("object");
		expect(this.game.actualPlace.title).toEqual("hangar");
		expect(this.game.actualPlace.title).not.toEqual("chodba1");

	});

	it('should set endPlace', function() {	
		expect(this.game.endPlace).toEqual(null);
		this.game.initPlaces(this.start);
		this.game.setEndPlace(this.start);

		expect(typeof this.game.endPlace).toEqual("object");
		expect(this.game.endPlace.title).toEqual("chodba1");
		expect(this.game.endPlace.title).not.toEqual("hangar");		
	});

	
	it('should check user input command', function() {
		
	});


});