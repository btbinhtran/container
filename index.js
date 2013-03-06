
/**
 * Module dependencies.
 */

var Factory = require('tower-factory');

/**
 * Expose an instance of `Container`.
 */

module.exports = new Container;

/**
 * Expose the `Container` constructor,
 * so you can use containers manually.
 */

module.exports.Container = Container;

/**
 * Instantiate a new `Container`.
 *
 * @api public
 */

function Container() {
  this.factories = {};
  this.cache = {};
}

/**
 * Register a factory/class.
 *
 * @api public
 */

Container.prototype.register = function(key, fn, args){
  this.factories[key] = new Factory(fn, args);

  return this;
}

/**
 * Get or lazily instantiate and return
 * an instance of a factory.
 *
 * @api public
 */

Container.prototype.lookup = function(key){
  return this.get(key) || this.set(key, this.factories[key].create());
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