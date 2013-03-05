# Tower Container

<!--[![Build Status](https://secure.travis-ci.org/viatropos/tower-container.png)](http://travis-ci.org/viatropos/tower-container)-->

This module doesn't have any external dependencies, so it can be used independent of Tower.

## Installation

node:

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

### Container#register(key, factory, [args])

Register a class to be used for instantiating.

``` js
function UsersController() {
  
}

container.register('controller:users', UsersController);
```

### Container#lookup(key)

Lookup the single instance of a registered class.

``` js
container.lookup('controller:users');
```

## Running Tests

```
git clone git://github.com/tower/container.git tower-container
cd tower-container
npm install
```

then run the tests:

```
mocha
```

## License

MIT