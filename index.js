
/**
 * Expose an instance of `Container`.
 */

module.exports = new Container;

/**
 * Instantiate a new `Container`.
 *
 * @api public
 */

function Container() {
  this.factories = {};
  this.args = {};
  this.cache = {};
}

/**
 * Get or lazily instantiate and return
 * an instance of a factory.
 *
 * @api public
 */

Container.prototype.lookup = function(key){
  var val = this.get(key);
  return val || this.set(key, this.factories[key].apply(this.factories[key], this.args[key]));
}

/**
 * Register a factory/class.
 *
 * @api public
 */

Container.prototype.register = function(key, factory, args){
  this.factories[key] = factory;
  this.args[key] = args;

  return this;
}

/**
 * Get an instance of a class.
 *
 * @api public
 */

Container.prototype.get = function(key){
  if (this.cache.hasOwnProperty(key)) return this.cache[key];
}

/**
 * Set an instance of a class.
 *
 * @api public
 */

Container.prototype.set = function(key, value){
  this.cache[key] = value;
  return this;
}

/**
 * Remove everything from the `cache`.
 *
 * @api public
 */

Container.prototype.clear = function(){
  this.cache = {};
  return this;
}

Container.prototype.undefine = function(key){
  delete this.cache[key];
}

/**
 * Expose the `Container` constructor,
 * so you can use containers manually.
 */

Container.prototype.Container = Container;
