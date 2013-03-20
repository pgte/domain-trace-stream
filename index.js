var domains = require('domain-observer');
var Options = require('./options');
var Stream = require('./stream');

var events = [
  'http-client-request-begin'
, 'http-client-request-end'
, 'http-client-response-begin'
// , 'http-client-response-end'
// , 'http-server-request-begin'
// , 'http-server-request-end'
// , 'http-server-response-end'
];

var listeners = {};
events.forEach(function(e) {
  listeners[e] = require('./listeners/' + e);
});

exports =
module.exports =
function S(options) {

  options = Options(options);

  /// Setup readable stream
  var s = Stream(options);

  /// Listen for domain events

  domains.on('created', function(d) {
    events.forEach(function(e) {
      d.on(e, function() {
        var listener = listeners[e];
        if (listener) {
          var event = listener.apply(listener, arguments);
          s.__enqueue(event);
        }
      });
    });
  });

  return s;
};

