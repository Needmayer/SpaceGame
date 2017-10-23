describe('Place ', function() {
	var place, placeStr, thing;

	beforeEach(function() {
		this.place = new Place("hangar",{"default" : "Hangár, kde jste přistáli se svou lodí."});
		this.placeStr = new Place("strojovna",{"default" : "Uvnitř je generátor na výrobu elektřiny, ale není puštěný.",
  									"ElectricityOn" : "Generátor běží. Světla svítí. Vzduch proudí."});
		
		this.thing = new Thing("sekera", 1, true, true, "Záchranářská sekera.");

	});


	/*
		palce tests:

		getInfoAnswer
		getThings
		addThing
		removeThing
		getTitles
		checkTakingThing
		checkPutingThing
		
	*/



	it('should return info answer', function() {
		expect(typeof this.place.getInfoAnswer()).toEqual("object");
		expect(this.place.getInfoAnswer().název).toEqual("hangar");
		expect(this.place.getInfoAnswer().popis).toEqual("Hangár, kde jste přistáli se svou lodí.");

		expect(typeof this.placeStr.getInfoAnswer()).toEqual("object");
		expect(this.placeStr.getInfoAnswer().název).toEqual("strojovna");
		expect(this.placeStr.getInfoAnswer().popis).toEqual("Uvnitř je generátor na výrobu elektřiny, ale není puštěný.");
		
	});

	it('should return changed info answer after update', function() {
		this.place.update("","ElectricityOn");
		this.placeStr.update("","ElectricityOn");

		expect(typeof this.place.getInfoAnswer()).toEqual("object");
		expect(this.place.getInfoAnswer().název).toEqual("hangar");
		expect(this.place.getInfoAnswer().popis).toEqual("Hangár, kde jste přistáli se svou lodí.");

		expect(typeof this.placeStr.getInfoAnswer()).toEqual("object");
		expect(this.placeStr.getInfoAnswer().název).toEqual("strojovna");
		expect(this.placeStr.getInfoAnswer().popis).not.toEqual("Uvnitř je generátor na výrobu elektřiny, ale není puštěný.");
		expect(this.placeStr.getInfoAnswer().popis).toEqual("Generátor běží. Světla svítí. Vzduch proudí.");
		
	});

	it('should return array of things in place', function() {
		expect(this.place.getThings().length).toEqual(0);
		this.place.things.push(this.thing);
		this.place.things.push(this.thing);
		this.place.things.push(this.thing);

		expect(this.place.getThings().length).toEqual(3);
		
	});

	it('should add thing to array of things', function() {
		this.place.addThing(thing);
		this.place.addThing("ddsafsdaf");

		expect(this.place.things.length).toEqual(2);
		
	});

	it('should remove thing from array of things', function() {
		this.place.things.push(this.thing);
		this.place.things.push(this.thing);
		this.place.things.push(this.thing);
		expect(this.place.things.length).toEqual(3);
		this.place.removeThing(1);		
		expect(this.place.things.length).toEqual(2);
		this.place.removeThing(1);
		expect(this.place.things.length).toEqual(1);

	});

	
	it('should return titles of things in array', function() {
		this.place.things.push(this.thing);
		this.place.things.push(this.thing);
		this.place.things.push(this.thing);
		this.place.things.push("bla");
		this.place.things.push("nope");
		this.place.things.push("ale ne");
		expect(this.place.things.length).toEqual(6);

		expect(this.place.getTitles("things").length).toEqual(3);
		expect(this.place.getTitles("things")[1]).toEqual("sekera");
		expect(this.place.getTitles("things")[0]).toEqual("sekera");
		expect(this.place.getTitles("things")[2]).toEqual("sekera");
		expect(this.place.getTitles("things")[3]).toEqual(undefined);
		expect(this.place.getTitles("things")[4]).toEqual(undefined);
		expect(this.place.getTitles("things")[5]).toEqual(undefined);

		expect(this.place.getTitles("bla").length).toEqual(0);
		
	});


	it('should return titles of exits in array', function() {
		this.place.exits.push(this.placeStr);
		this.place.exits.push(this.placeStr);
		this.place.exits.push(this.placeStr);
		this.place.exits.push("bla");
		this.place.exits.push("nope");
		this.place.exits.push("ale ne");
		expect(this.place.exits.length).toEqual(6);
		expect(this.place.getTitles("exits").length).toEqual(3);
		expect(this.place.getTitles("exits")[1]).toEqual("strojovna");
		expect(this.place.getTitles("exits")[0]).toEqual("strojovna");
		expect(this.place.getTitles("exits")[2]).toEqual("strojovna");
		expect(this.place.getTitles("exits")[3]).toEqual(undefined);
		expect(this.place.getTitles("exits")[4]).toEqual(undefined);
		expect(this.place.getTitles("exits")[5]).toEqual(undefined);
		
	});

	it('should check taking thing', function() {

		expect(this.place.checkTakingThing(this.thing)).toEqual(false);
		this.place.things.push(this.thing);
		expect(this.place.checkTakingThing(this.thing)).not.toEqual(false);
		expect(this.place.checkTakingThing("sekera")).toEqual(false);
		
	});

	it('should check putting thing', function() {
		expect(this.place.checkPutingThing(this.thing)).toEqual(true);
		expect(this.place.checkPutingThing("sekera")).toEqual(false);
	});


});