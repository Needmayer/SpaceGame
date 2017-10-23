describe('Inventory ', function() {
	var inv, lightThing,hevThing,heviestThing,notUsableThing,notTransferableThing;

	beforeEach(function() {
		this.inv = new Inventory();
		this.lightThing = new Thing("lightThing", 1, true, true);
		this.hevThing = new Thing("hevThing", 3, true, true);
		this.heviestThing = new Thing("heviestThing", 20, true, true);
		this.notUsableThing = new Thing("notUsableThing", 1, false, true);
		this.notTransferableThing = new Thing("notTransferableThing", 1, true, false);
		

	});


	/*
		inventory tests:
		getMaxSize
		addThing
		removeThing
		changeWeight
		checkAddingThing
		checkRemovingThing
		getThingsTitles
	*/

	it('should return array of things', function() {
		expect(this.inv.getThings().length).toEqual(0);

		this.inv.things.push(this.lightThing);
		this.inv.things.push(this.hevThing);

		expect(this.inv.getThings().length).toEqual(2);		
		expect(this.inv.getThings()[0].title).toEqual("lightThing");		
	});

	it('should return maxSize', function() {
		this.inv.maxSize = 2;
		expect(this.inv.getMaxSize()).toEqual(2);
		this.inv.maxSize = 10;
		expect(this.inv.getMaxSize()).toEqual(10);
	});

	it('should Add thing to array of things', function() {
		

		this.inv.addThing(this.lightThing);
		expect(this.inv.things[0]).toEqual(this.lightThing);
		expect(this.inv.things.length).toEqual(1);

		this.inv.addThing(this.hevThing);
		expect(this.inv.things[1]).toEqual(this.hevThing);
		expect(this.inv.things.length).toEqual(2);
	});


	it('should remove thing from array of things', function() {
		this.inv.things.push(this.lightThing);
		this.inv.things.push(this.hevThing);
		expect(this.inv.things[0]).toEqual(this.lightThing);
		expect(this.inv.things.length).toEqual(2);
		this.inv.removeThing(0);
		expect(this.inv.things.length).toEqual(1);
		expect(this.inv.things[0]).toEqual(this.hevThing);
		this.inv.removeThing(0);
		expect(this.inv.things.length).toEqual(0);

	});


	it('should change weight', function() {
		expect(this.inv.weight).toEqual(0);
		this.inv.changeWeight(this.lightThing, "+");
		expect(this.inv.weight).toEqual(1);
		this.inv.changeWeight(this.hevThing, "+");
		expect(this.inv.weight).toEqual(4);
		this.inv.changeWeight(this.hevThing, "-");
		expect(this.inv.weight).toEqual(1);
		this.inv.changeWeight(this.lightThing, "-");
		expect(this.inv.weight).toEqual(0);
	});

	it('should change weigt by weight of thing being added to inventory', function() {
		expect(this.inv.weight).toEqual(0);

		this.inv.addThing(this.lightThing);
		expect(this.inv.weight).toEqual(1);

		this.inv.addThing(this.hevThing);
		expect(this.inv.weight).toEqual(4);

	});

	it('should change weigt by weight of thing removed from inventory', function() {
		expect(this.inv.weight).toEqual(0);

		this.inv.things.push(this.lightThing);
		this.inv.things.push(this.hevThing);		
		this.inv.weight = 4;		
		expect(this.inv.weight).toEqual(4);
		this.inv.removeThing(1);
		expect(this.inv.weight).toEqual(1);

	});

	it('should check weight of thing adding to the inventory', function() {

		var lt = this.inv.checkAddingThing(this.lightThing);
		var ht = this.inv.checkAddingThing(this.hevThing)
		var hht = this.inv.checkAddingThing(this.heviestThing);

		expect(ht).toEqual(true);		
		expect(lt).toEqual(true);
		expect(hht).toEqual(false);		
		
	});

	it('should check if adding thing is transfarable + weight', function() {

		var lt = this.inv.checkAddingThing(this.lightThing);
		var ht = this.inv.checkAddingThing(this.hevThing)
		var hht = this.inv.checkAddingThing(this.heviestThing);
		var ntt = this.inv.checkAddingThing(this.notTransferableThing);

		expect(ht).toEqual(true);		
		expect(lt).toEqual(true);
		expect(hht).toEqual(false);
		expect(hht).toEqual(false);
		
		
	});

	it('should check thing removing from the inventory', function() {

		expect(this.inv.things.length).toEqual(0);

		var lt = this.inv.checkRemovingThing(this.lightThing);
		var ht = this.inv.checkRemovingThing(this.hevThing)
		var hht = this.inv.checkRemovingThing(this.heviestThing);

		expect(ht).toEqual(false);		
		expect(lt).toEqual(false);
		expect(hht).toEqual(false);

		this.inv.things.push(this.lightThing);
		this.inv.things.push(this.hevThing);	

		lt = this.inv.checkRemovingThing(this.lightThing);
		ht = this.inv.checkRemovingThing(this.hevThing)
		hht = this.inv.checkRemovingThing(this.heviestThing);

		expect(ht).toEqual(jasmine.any(Number));		
		expect(lt).toEqual(jasmine.any(Number));	
		expect(hht).toEqual(false);
		
		
	});

	it('should check type of input adding to the inventory', function() {

		var lt = this.inv.checkAddingThing(this.lightThing);
		var ht = this.inv.checkAddingThing(this.hevThing);
		var str = this.inv.checkAddingThing("fdsfas");

		expect(ht).toEqual(true);		
		expect(lt).toEqual(true);
		expect(str).toEqual(false);		
		
	});


	it('should return titles of things in array', function() {
		var titles = this.inv.getThingsTitles();
		expect(titles.length).toEqual(0);
		this.inv.things.push(this.lightThing);
		this.inv.things.push(this.hevThing);
		expect(this.inv.things[0].title).toEqual("lightThing");
		titles = this.inv.getThingsTitles();
		expect(titles.length).toEqual(2);
		expect(titles[0]).toEqual("lightThing");
		expect(titles[1]).toEqual("hevThing");

	});

});