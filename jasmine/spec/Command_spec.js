describe('Command', function() {

	var command, comGo, comUse, comTake;
	beforeEach(function() {
		this.command = new Command();
		this.comGo = new CommandGo();
		this.comUse = new CommandUse();
		this.comTake = new CommandTake();
	});

	it('should check if command exists by its title', function() {
		expect(this.command.checkCommand("seber")).toEqual(false);
		expect(this.command.checkCommand("jdi")).toEqual(false);
		expect(this.command.checkCommand("pouzij")).toEqual(false);

		this.command.commandsArray.push(this.comGo);
		this.command.commandsArray.push(this.comUse);
		this.command.commandsArray.push(this.comTake);

		expect(this.command.checkCommand("seber")).toEqual(true);
		expect(this.command.checkCommand("jdi")).toEqual(true);
		expect(this.command.checkCommand("pouzij")).toEqual(true);

		expect(this.command.checkCommand("poloz")).toEqual(false);
		expect(this.command.checkCommand(this.comGo)).toEqual(false);
		expect(this.command.checkCommand("prikazy")).toEqual(false);
		expect(this.command.checkCommand("help")).toEqual(false);
	});

	it('should register command new command', function() {
		expect(this.command.checkCommand("seber")).toEqual(false);
		expect(this.command.checkCommand("jdi")).toEqual(false);
		expect(this.command.registerCommand(this.comGo)).toEqual(true);
		expect(this.command.registerCommand(this.comGo)).toEqual(false);
		expect(this.command.registerCommand(this.comTake)).toEqual(true);

		expect(this.command.checkCommand("seber")).toEqual(true);
		expect(this.command.checkCommand("jdi")).toEqual(true);
	});

	it('should unregister command', function() {
		expect(this.command.checkCommand("seber")).toEqual(false);
		expect(this.command.checkCommand("jdi")).toEqual(false);
		expect(this.command.checkCommand("pouzij")).toEqual(false);

		this.command.commandsArray.push(this.comGo);
		this.command.commandsArray.push(this.comUse);
		this.command.commandsArray.push(this.comTake);

		expect(this.command.checkCommand("seber")).toEqual(true);
		expect(this.command.checkCommand("jdi")).toEqual(true);
		expect(this.command.checkCommand("pouzij")).toEqual(true);

		expect(this.command.unregisterCommand(this.comGo)).toEqual(true);
		expect(this.command.unregisterCommand(this.comGo)).toEqual(false);
		expect(this.command.unregisterCommand(this.comTake)).toEqual(true);

		expect(this.command.checkCommand("seber")).toEqual(false);
		expect(this.command.checkCommand("jdi")).toEqual(false);
		expect(this.command.checkCommand("pouzij")).toEqual(true);

	});

	it('should unregister all commands', function() {
		expect(this.command.commandsArray.length).toEqual(0);	
		this.command.commandsArray.push(this.comGo);
		this.command.commandsArray.push(this.comUse);
		this.command.commandsArray.push(this.comTake);
		expect(this.command.commandsArray.length).toEqual(3);	

		this.command.unregisterAllCommands();
		expect(this.command.commandsArray.length).toEqual(0);	

	});

	it('should return array contains all registered commands', function() {
		expect(this.command.getCommandsArray().length).toEqual(0);	
		this.command.commandsArray.push(this.comGo);
		this.command.commandsArray.push(this.comUse);
		this.command.commandsArray.push(this.comTake);
		expect(this.command.getCommandsArray().length).toEqual(3);
	});

	it('should return object of command by its title', function() {

		this.command.commandsArray.push(this.comGo);
		this.command.commandsArray.push(this.comUse);
		this.command.commandsArray.push(this.comTake);

		expect(this.command.getCommand("jdi") instanceof CommandGo).toEqual(true);
		expect(this.command.getCommand("seber") instanceof CommandTake).toEqual(true);
		expect(this.command.getCommand("seber")).not.toEqual("seber");
		
		
	});













});