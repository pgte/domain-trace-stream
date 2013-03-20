var test = require('tap').test;
var http = require('http');
var domain = require('domain');
var S = require('..');

test('emits http-client-request-begin', function(t) {
  t.plan(5);

  var s = S();
  var d = domain.create();

  s.on('readable', function() {
    var event = s.read();
    if (event && event.event == 'http-client-request-begin') {
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

test('emits http-client-request-end', function(t) {
  t.plan(5);

  var s = S();
  var d = domain.create();

  s.on('readable', function() {
    var event = s.read();
    if (event && event.event == 'http-client-request-end') {
      t.type(event.time, 'number');
      t.ok(event.timeDiff >= 0);
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

test('emits http-client-response-begin', function(t) {
  t.plan(6);

  var s = S();
  var d = domain.create();

  s.on('readable', function() {
    var event = s.read();
    if (event && event.event == 'http-client-response-begin') {
      t.type(event.time, 'number');
      t.ok(event.timeDiff >= 0);
      t.equal(event.method, 'GET');
      t.equal(event.path, '/search.json?q=nodejs');
      t.equal(event.host, 'search.twitter.com');
      t.type(event.headers, 'object');
    }
  });

  d.run(function() {
    http.get('http://search.twitter.com/search.json?q=nodejs', function(res) {
      res.resume();
    });
  });
});

test('emits http-client-response-end', function(t) {
  t.plan(8);

  var s = S();
  var d = domain.create();

  s.on('readable', function() {
    var event = s.read();
    if (event && event.event == 'http-client-response-end') {
      t.type(event.time, 'number');
      t.ok(event.timeDiff >= 0);
      t.equal(event.method, 'GET');
      t.equal(event.path, '/search.json?q=nodejs');
      t.equal(event.host, 'search.twitter.com');
      t.type(event.headers, 'object');
      t.type(event.bytesRead, 'number');
      t.ok(event.bytesRead > 0);
    }
  });

  d.run(function() {
    http.get('http://search.twitter.com/search.json?q=nodejs', function(res) {
      res.resume();
    });
  });
});