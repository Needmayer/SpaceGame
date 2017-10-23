describe('Level and States ', function() {
	var level, terminal, doors, spaceSuit, electricity, manual, kompresor;
	beforeEach(function() {
		this.level = new Level();
		this.doorsS = new Doors(this.level.start.states[2]);
		this.doorsE = new Doors(this.level.start.states[3]);
		this.terminal = new Terminal(this.level.start.states[7]);
		this.spaceSuit = new SpaceSuit(this.level.start.states[0]);
		this.kompresor = new Thing("kompresor",80, true, false, "");
		this.electricity = new Electricity(this.level.start.states[1]);
		this.manual = new Manual(this.level.start.states[8]);
	});


	it('should return level by name', function() {
		var lev = this.level.getLevel("start");
		expect(lev.places.length).toEqual(12);
		expect(lev.things).not.toEqual("undefined");
		expect(lev.persons).not.toEqual("undefined");
		expect(lev.exitsAndThings).not.toEqual("undefined");
		expect(lev.startPlace).not.toEqual("undefined");
		expect(lev.endPlace).not.toEqual("undefined");
		expect(lev.commands).not.toEqual("undefined");
		expect(lev.states).not.toEqual("undefined");
	});

	it('should generate random codes of length 5 - 9 with numbers and letters', function() {
		var i, code;
		for(i = 0; i < 100; i += 1){
			code = this.level.generateCodes();
			expect(code).not.toMatch(/\W\s/);			
			expect(code).toMatch(/^[a-zA-Z0-9]{5,9}$/);
		}
	});

	it('should check terminal args', function() {
		expect(this.terminal.title).toEqual("Terminal");
		expect(this.terminal.onStatePanel).toEqual(false);
		expect(this.terminal.place1).toEqual("ridici_centrum");
		
	});

	it('should decrypt generated codes in Terminal state', function() {
		var i, code, decCode;
		for(i = 0; i < 100; i += 1){
			code = this.level.generateCodes();
			decCode = this.terminal.decryptCode(code);
			expect(decCode).toMatch(/^[a-zA-Z0-9]{5,9}$/);
		}
	});

	it('should check reaction of doors on sekera', function() {
		expect(this.doorsS.react("vypocetni_centrum", "strojovna", "dvere")).toContain(this.doorsS.negativeAnswer);
		expect(this.doorsS.react("vypocetni_centrum", "hangar", "")).toEqual(false);
		expect(this.doorsS.react("pokoj", "hangar", "")).toEqual(false);
		expect(this.doorsS.react("strojovna", "vypocetni_centrum", "")).toContain(this.doorsS.negativeAnswer);

		expect(this.doorsS.react("sekera", "strojovna", "dvere")).toContain(this.doorsS.positiveAnswer);
	});

	it('should react on pacidlo', function() {
		expect(this.doorsS.react("vypocetni_centrum", "strojovna", "dvere")).toContain(this.doorsS.negativeAnswer);
		expect(this.doorsS.react("pacidlo", "strojovna", "dvere")).toContain(this.doorsS.positiveAnswer);
	});
	it('should react on pacidlo from another place', function() {
		expect(this.doorsS.react("vypocetni_centrum", "strojovna", "dvere")).toContain(this.doorsS.negativeAnswer);
		expect(this.doorsS.react("pacidlo", "vypocetni_centrum", "dvere")).toContain(this.doorsS.positiveAnswer);
	});
	it('should react on pacidlo from another place', function() {
		expect(this.doorsS.react("vypocetni_centrum", "strojovna", "dvere")).toContain(this.doorsS.negativeAnswer);
		expect(this.doorsS.react("pacidlo", "hangar", "dvere")).toEqual(false);
	});

	it('should check reaction of spacesuite', function() {
		expect(this.spaceSuit.react("kompresor", "hangar", false)).toEqual("Vzduch ve skafandru je už na maximalní hodnotě.");
		expect(this.spaceSuit.react("kompresor", "chodba1", false)).toEqual(undefined);

		this.spaceSuit.state = 90; 		
		expect(this.spaceSuit.react("kompresor", "hangar", false)).toEqual("Vzduch ve skafandru doplněn na 100%.");
		expect(this.spaceSuit.state).toEqual(100);
		
	});

	it('should update state of spacesuite', function() {
		expect(this.spaceSuit.state).toEqual(100);
		this.spaceSuit.update(new CommandUse, "this.kompresor");
		expect(this.spaceSuit.state).toEqual(95);
		this.spaceSuit.update(new CommandGo, "this.kompresor");
		expect(this.spaceSuit.state).toEqual(85);
		this.spaceSuit.update(new CommandTake, "this.kompresor");
		expect(this.spaceSuit.state).toEqual(80);
		this.spaceSuit.update(new CommandPut, "this.kompresor");
		expect(this.spaceSuit.state).toEqual(75);

		this.spaceSuit.update(new CommandCode, "this.kompresor");
		this.spaceSuit.update(new CommandWhat, "this.kompresor");
		this.spaceSuit.update(new CommandSpeak, "this.kompresor");
		this.spaceSuit.update(new CommandEnd, "this.kompresor");
		expect(this.spaceSuit.state).toEqual(75);
		this.spaceSuit.update(new CommandUse, this.kompresor);
		expect(this.spaceSuit.state).toEqual(100);
	});

	it('should check reaction of manual', function() {

		expect(this.manual.react("baterie", "manual")).toContain(this.manual.positiveAnswer);
		expect(this.manual.react("manual", "baterie" )).toContain(this.manual.positiveAnswer);
		expect(this.manual.react("manual", "sekera" )).toContain(this.manual.negativeAnswer);
		expect(this.manual.react("baterie", "bateri")).toEqual(false);
		expect(this.manual.react("vec", "manual")).toEqual(false);
		
	});


	it('should check reaction of Electricity state', function() {
		expect(this.electricity.react("generator", "strojovna", false)).toContain(this.electricity.positiveAnswer);
		expect(this.electricity.react("generator", "vypocetni_centrum", false)).toEqual(false);
		expect(this.electricity.react("kompresor", "strojovna", false)).toEqual(false);
	});

});


