var test = require('tap').test;
var http = require('http');
var domain = require('domain');
var S = require('..');

function randomPort() {
  return Math.ceil(Math.random() * 8000) + 1024;
}

test('emits http-server-request-begin', function(t) {
  t.plan(6);

  var server = http.createServer();
  server.on('request', function(req, res) {
    var d = domain.create();

    d.add(req);
    d.add(res);

    req.resume();
    res.end('Hey');
  });
  var port = randomPort();
  server.listen(port);

  var s = S();

  s.on('readable', function() {
    var event = s.read();
    if (event && event.event == 'http-server-request-begin') {
      t.type(event.time, 'number');
      t.strictEqual(event.timeDiff, 0);
      t.equal(event.method, 'GET');
      t.equal(event.path, '/abcdef?abc=def');
      t.equal(event.host, 'localhost:' + port);
      t.type(event.headers, 'object');
    }
  });

  server.once('listening', function(err) {
    if (err) throw err;
    http.get('http://localhost:' + port + '/abcdef?abc=def', function(res) {
      res.resume();
      res.once('end', function() {
        server.close();
      });
    });
  });
});