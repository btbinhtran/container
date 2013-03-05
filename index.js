
/**
 * Expose `container`.
 */

module.exports = new Container;

function Container() {
  this.factories = {};
  this.args = {};
  this.cache = {};
}

Container.prototype.lookup = function(key){
  var val = this.get(key);
  return val || this.set(key, this.factories[key].apply(this.factories[key], this.args[key]));
}

Container.prototype.register = function(key, factory, args){
  this.factories[key] = factory;
  this.args[key] = args;

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
