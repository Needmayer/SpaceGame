function SubjectAnswer(){
  this.observersAnswer = new ObserverList();
}
 
SubjectAnswer.prototype.addObserverAnswer = function( observer ){
  this.observersAnswer.add( observer );
};
 
SubjectAnswer.prototype.removeObserverAnswer = function( observer ){
  this.observersAnswer.removeAt( this.observersAnswer.indexOf( observer, 0 ) );
};
 
SubjectAnswer.prototype.notifyAnswer = function(cmd, msg, obj){
  var observerCount = this.observersAnswer.count();
  for(var i=0; i < observerCount; i++){
    this.observersAnswer.get(i).updateAnswer( cmd, msg, obj);
  }
};