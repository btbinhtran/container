
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
 * @param {String}    key
 * @param {Function}  fn
 * @param {Array}     [args]
 * @api public
 */

Container.prototype.register = function(key, fn, args){
  this.factories[key] = new Factory(fn, args);
  return this;
}

/**
 * Get a registered factory.
 *
 * Example:
 *
 *    container.factory('admin', User, { isAdmin: true })
 *    container.factory('admin').create();
 *
 * @param {String}    key
 * @param {Function}  [fn]
 * @param {Array}     [args]
 * @api public
 */

Container.prototype.factory = function(key, fn, args){
  if (1 == arguments.length) return this.factories[key];
  return this.register(key, fn, args);
}

/**
 * Get or lazily instantiate and return
 * an instance of a factory.
 *
 * @param {String} key
 * @param {String} [factoryKey] Can be a glob.
 * @api public
 */

Container.prototype.lookup = function(key, factoryKey){
  return this.get(key) || this.set(key, this.resolve(factoryKey || key));
}

/**
 * Resolve to the factory instance from a key.
 *
 * @param {String} key
 * @api public
 */

Container.prototype.resolve = function(key){
  return this.factories[key].create();
}

/**
 * Get an instance of a class.
 *
 * @param {String} key
 * @api public
 */

Container.prototype.get = function(key){
  if (this.cache.hasOwnProperty(key)) return this.cache[key];
}

/**
 * Set an instance of a class.
 *
 * @param {String} key
 * @param {Object} val
 * @api public
 */

Container.prototype.set = function(key, val){
  return this.cache[key] = val;
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