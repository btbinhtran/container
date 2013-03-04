
/**
 * Expose `container`.
 */

module.exports = new Container;

function Container() {
  this.registry = {};
  this.cache = {};
}

Container.prototype.lookup = function(key){
  var val = this.get(key);
  return val || (val = this.registry[key]) && this.set(key, val[0].apply(val[0], val[1]));
}

Container.prototype.register = function(key, factory, args){
  this.registry[key] = [factory, args];

  return this;
}

Container.prototype.get = function(key){
  if (this.cache.hasOwnProperty(key)) return this.cache[key];
}

Container.prototype.set = function(key, value){
  return this.cache[key] = value;
}

Container.prototype.clear = function() {
  this.cache = {};
  return this;
}

Container.prototype.undefine = function(key) {
  delete this.cache[key];
}

Container.prototype.Container = Container;
