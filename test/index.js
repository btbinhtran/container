var container = require('..')
  , assert = require('assert');

describe('container', function(){
  before(container.clear);

  it('#instance', function(){
    container.ns('route');

    var a = new Route;
    var b = new Route;
    
    container.instance('route', 'a', a);
    container.instance('route', 'b', b);

    var routes = container.instances['route'];

    assert(2 == routes.size());
    
    routes.forEach(function(key, val, i){
      if (0 == i) {
        assert('a' == key);
        assert(a == val);
      }
      if (1 == i) {
        assert('b' == key);
        assert(b == val);
      }
    })
  });
});

function Route() {

}