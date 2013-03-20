var test = require('tap').test;
var http = require('http');
var domain = require('domain');
var S = require('..');

test('emits http-client-request-begin', function(t) {
  t.plan(6);

  var s = S();
  var d = domain.create();

  s.on('readable', function() {
    var event = s.read();
    if (event) {

      // event: 'http-client-request-begin',
      // time: time,
      // timeDiff: timeDiff,
      // method: req.method,
      // path: req.path,
      // host: req._headers.host,

      t.equal(event.event, 'http-client-request-begin');
      t.type(event.time, 'number');
      t.strictEqual(event.timeDiff, 0);
      t.equal(event.method, 'GET');
      t.equal(event.path, '/search.json?q=nodejs');
      t.equal(event.host, 'search.twitter.com')
    }
  });

  d.run(function() {
    http.get('http://search.twitter.com/search.json?q=nodejs', function(res) {
      res.resume();
    });
  });
});