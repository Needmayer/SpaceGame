describe('State', function() {

	var state, stOk, stWrong;
	beforeEach(function() {
		this.state = new State();
	
		this.stOk = {
			title: "stOk"
		};
		this.stWrong = {};
	});


	it('should add new state', function() {		
		expect(this.state.states.length).toEqual(0);
		this.state.addState(this.stOk);
		this.state.addState(this.stOk);
		expect(this.state.states.length).toEqual(1);
	});
	
	it('should remove state', function() {
		expect(this.state.states.length).toEqual(0);
		this.state.states.push(this.stOk);
		this.state.states.push(this.stOk);
		expect(this.state.states.length).toEqual(2);
		this.state.removeState(this.stOk);
		expect(this.state.states.length).toEqual(1);
		this.state.removeState(this.stOk);
		expect(this.state.states.length).toEqual(0);


	});

	it('should return specific state', function() {
		this.state.states.push(this.stOk);
		expect(this.state.getState("stOk")).toEqual(this.stOk);		
		expect(this.state.getState("test")).toEqual(false);
	});


	it('should return all states', function() {
		expect(this.state.getAllStates().length).toEqual(0);
		this.state.states.push(this.stOk);
		this.state.states.push(this.stOk);
		expect(this.state.getAllStates().length).toEqual(2);
	});

	it('should check parrameter as state', function() {		
		expect(this.state.checkState(this.stOk)).toEqual(true);
		expect(this.state.checkState(this.stWrong)).toEqual(false);
		expect(this.state.checkState("test")).toEqual(false);

		
	});

});