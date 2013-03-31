
/**
 * Module dependencies.
 */

var Map = require('tower-map');

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
  this.instances = {};
  this.fns = {};
}

/**
 * Register a new namespace.
 *
 * @api public
 */

Container.prototype.ns = function(ns){
  if (this.factories[ns]) return this;

  this.factories[ns] = new Map;
  this.instances[ns] = new Map;
  this.fns[ns] = new Map;

  return this;
}

/**
 * Get or set a factory (class) by key.
 *
 * @api public
 */

Container.prototype.factory = function(ns, key, val){
  return 3 == arguments.length
    ? this.factories[ns].set(key, val) // && this for chaining when setting?
    : this.factories[ns].get(key);
}

/**
 * Get or set an object instance by key.
 *
 * @api public
 */

Container.prototype.instance = function(ns, key, val){
  assertNamespace(this, ns);

  switch (arguments.length) {
    case 3:
      return this.instances[ns].set(key, val);
      break;
    case 2:
      return this.instances[ns].get(key)
        || this.instances[ns].set(key, new (this.factory(ns, key)));
      break;
    case 1:
      return this.instances[ns];
      break;
  }
}

/**
 * Get or set a function by key.
 *
 * @api public
 */

Container.prototype.fn = function(ns, key, val){
  return 3 == arguments.length
    ? this.fns[ns].set(key, val)
    : this.fns[ns].get(key);
}

/**
 * Lookup factories/instances/functions by fully qualified name.
 *
 * @api fun
 */

Container.prototype.lookup = function(path){
  path = path.split('.');
  if (!path[0].match(/^(?:factories|instances|fns)$/)) return;
  return this[path[0]](path[1], path.slice(2).join('.'));
}

/**
 * Remove all objects (not namespaces).
 *
 * @api public
 */

Container.prototype.clear = function(){
  for (var key in this.factories) {
    this.factories[key].clear();
    this.instances[key].clear();
    this.fns[key].clear();
  }
}

function assertNamespace(c, ns) {
  if (!c.factories[ns]) throw new Error('Namespace `' + ns + '` does not exist');
}