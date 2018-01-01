/**
 * The Observable is an object type that alerts functions called Observers of when its
 * value changes. This makes it useful for asynchronous operations, because you don't
 * have to wait on your Observable - it tells you when it changes.
 */
 
function Observable(myFn) {
    this.observers = [];
    this.fn = myFn;
    
    this.observe = function(observer) {
      this.observers.push(observer);
    }
    
    this.emit = function(value) {
      for(var o in this.observers) {
        this.observers[o](value);
      }
    }
    
    this.run = function(params) {
      this.emit(this.fn(params));
    }
  }