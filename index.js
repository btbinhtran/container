
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

Container.prototype.ns = function(ns) {
  this.factories[ns] = {};
  this.instances[ns] = {};
  this.fns[ns] = {};

  return this;
}

/**
 * Get or set a factory (class) by key.
 *
 * @api public
 */

Container.prototype.factory = function(ns, key, val) {
  return 3 == arguments.length
    ? this.factories[ns][key] = val // && this for chaining when setting?
    : this.factories[ns][key];
}

/**
 * Get or set an object instance by key.
 *
 * @api public
 */

Container.prototype.instance = function(ns, key, val) {
  return 3 == arguments.length
    ? this.instances[ns][key] = val
    : this.instances[ns][key]
      = this.instances[ns][key] || new (this.factory(ns, key));
}

/**
 * Get or set a function by key.
 *
 * @api public
 */

Container.prototype.fn = function(ns, key, val) {
  return 3 == arguments.length
    ? this.fns[ns][key] = val
    : this.fns[ns][key];
}

/**
 * Lookup factories/instances/functions by fully qualified name.
 *
 * @api fun
 */

Container.prototype.lookup = function(path) {
  path = path.split('.');
  if (!path[0].match(/^(?:factories|instances|fns)$/)) return;
  return this[path[0]](path[1], path.slice(2).join('.'));
}