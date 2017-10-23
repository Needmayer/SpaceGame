var Thing = function(title, weight, useable, trasferable, description){

	this.title = title;
	this.weight = weight;
	this.useable = useable;
	this.trasferable = trasferable;
	this.description = description;

}

Thing.prototype.getInfo = function(){
	return {
		title : this.title,
		weight: this.weight,
		useable:this.useable,
		trasferable:this.trasferable,
		description:this.description
	};
}

Thing.prototype.getInfoAnswer = function(){
	return {
		název: this.title,
		váha: this.weight,
		použitelná:this.useable,
		přenositelná:this.trasferable,
		popis:this.description
	};
}
