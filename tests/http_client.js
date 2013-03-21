var test = require('tap').test;
var http = require('http');
var domain = require('domain');
var S = require('..');

function randomPort() {
  return Math.ceil(Math.random() * 8000) + 1024;
}

test('emits http-client-request-begin', function(t) {
  t.plan(7);

  var server = http.createServer();
  server.on('request', function(req, res) {
    req.resume();
    res.end('Hey');
  });
  var port = randomPort();
  server.listen(port);

  var s = S();
  var d = domain.create();

  s.on('readable', function() {
    var event = s.read();
    if (event && event.event == 'http-client-request-begin') {
      t.type(event.time, 'number');
      t.strictEqual(event.timeDiff, 0);
      t.equal(event.method, 'GET');
      t.equal(event.path, '/abcdef?abc=def');
      t.equal(event.host, 'localhost:' + port);
      t.type(event.headers, 'object');
      t.type(event.trace_id, 'string');
    }
  });

  server.once('listening', function(err) {
    if (err) throw err;
    d.run(function() {
      http.get('http://localhost:' + port + '/abcdef?abc=def', function(res) {
        res.resume();
        res.once('end', function() {
          server.close();
        });
      });
    });
  });

});

test('emits http-client-request-end', function(t) {
  t.plan(6);

  var server = http.createServer();
  server.on('request', function(req, res) {
    req.resume();
    res.end('Hey');
  });
  var port = randomPort();
  server.listen(port);

  var s = S();
  var d = domain.create();

  s.on('readable', function() {
    var event = s.read();
    if (event && event.event == 'http-client-request-end') {
      t.type(event.time, 'number');
      t.ok(event.timeDiff >= 0);
      t.equal(event.method, 'GET');
      t.equal(event.path, '/ghi?klm=123');
      t.equal(event.host, 'localhost:' + port)
      t.type(event.trace_id, 'string');
    }
  });

  server.once('listening', function() {
    d.run(function() {
      http.get('http://localhost:' + port + '/ghi?klm=123', function(res) {
        res.resume();
        res.once('end', function() {
          server.close();
        });
      });
    });
  });
});

test('emits http-client-response-begin', function(t) {
  t.plan(7);

  var server = http.createServer();
  server.on('request', function(req, res) {
    req.resume();
    res.end('Hey');
  });
  var port = randomPort();
  server.listen(port);

  var s = S();
  var d = domain.create();

  s.on('readable', function() {
    var event = s.read();
    if (event && event.event == 'http-client-response-begin') {
      t.type(event.time, 'number');
      t.ok(event.timeDiff >= 0);
      t.equal(event.method, 'GET');
      t.equal(event.path, '/jdbsakjdbsa?abc=ddd');
      t.equal(event.host, 'localhost:' + port);
      t.type(event.headers, 'object');
      t.type(event.trace_id, 'string');
    }
  });

  server.once('listening', function() {
    d.run(function() {
      http.get('http://localhost:' + port + '/jdbsakjdbsa?abc=ddd', function(res) {
        res.resume();
        res.once('end', function() {
          server.close();
        });
      });
    });
  });
});

test('emits http-client-response-end', function(t) {
  t.plan(9);

  var server = http.createServer();
  server.on('request', function(req, res) {
    req.resume();
    res.end('Hey');
  });
  var port = randomPort();
  server.listen(port);

  var s = S();
  var d = domain.create();

  s.on('readable', function() {
    var event = s.read();
    if (event && event.event == 'http-client-response-end') {
      t.type(event.time, 'number');
      t.ok(event.timeDiff >= 0);
      t.equal(event.method, 'GET');
      t.equal(event.path, '/adljaldkj?lawjheqwe=3213');
      t.equal(event.host, 'localhost:' + port);
      t.type(event.headers, 'object');
      t.type(event.bytesRead, 'number');
      t.ok(event.bytesRead > 0);
      t.type(event.trace_id, 'string');
    }
  });

  server.once('listening', function() {
    d.run(function() {
      http.get('http://localhost:' + port + '/adljaldkj?lawjheqwe=3213', function(res) {
        res.resume();
        res.once('end', function() {
          server.close();
        });
      });
    });
  });
});