# Tower Container

This module doesn't have any external dependencies, so it can be used independent of Tower.

## Installation

node.js:

```
npm install tower-container
```

browser:

```
component install tower/container
```

## API

``` js
var container = require('tower-container');
```

``` js

/**
 * Models are only stored by their class.
 */

container.factories.model['post'] = Post;
container.factory('model', 'post');
container.factory('model', 'post', Post);

/**
 * Text all use the same class, but are stored uniquely by instance.
 */

container.factories.text['*'] = Text;
container.instances.text['messages'] = new Text;
container.instance('text', 'messages')

/**
 * Views are stored uniquely by class and instance.
 */

container.factories.view['posts.index'] = View;
container.instances.view['posts.index'] = new View;
container.instance('view', 'posts.index');
container.instance('view', 'posts.index', new View);

/**
 * Since classes are functions, to distinguish functions
 * from classes (which classes you want to instantiate, functions not),
 * you can use `functions`.
 */

container.fns.template['posts.index'] = function(){
  return '<ul></ul>';
}

container.fn('template', 'posts.index')();

/**
 * Controllers we also want to store as factories and instances.
 */

container.factories.controller['posts.index'] = Controller;
container.instances.controller['posts.index'] = new Controller;
container.factory('controller', 'posts.index');
container.factory('controller', 'posts.index', Controller);
container.instance('controller', 'posts.index');
container.instance('controller', 'posts.index', new Controller);

/**
 * Routes are only stored as instances.
 */

container.factories.route['*'] = Route;
container.instances.route['posts.index'] = new Route;

/**
 * Adapters are also stored as instances.
 */

container.factories.adapter['*'] = Adapter;
container.instances.adapter['mysql'] = new Adapter;
container.instance('adapter', 'mysql');

/**
 * Jobs are just factories (like models).
 * (but the API for defining a job only requires a function).
 */

container.factories.job['crawl-twitter'] = Job;
container.instance('job', 'crawl-twitter', new Job(fn));

/**
 * Helpers (for templates) are stored as functions.
 */

container.fns.helper['humanize'] = function(){}
container.fn('helper', 'humanize')();

/**
 * Register a namespace, which will create:
 * - `factories.x`
 * - `instances.x`
 * - `fns.x`
 *
 * Otherwise you can just do `container.factories.x = {}` if you want.
 */

container.ns('model');
```