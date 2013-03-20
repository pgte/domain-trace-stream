var Readable = require('stream').Readable;

module.exports =
function Stream(options) {

  /// Queue
  var queue = [];
  
  /// Readable Stream
  var s = new Readable({objectMode: true});

  function push() {
    var pump = true;
    var elem;
    while (queue.length && pump) {
      elem = queue.splice(0, 1)[0];
      pump = this.push(elem);
    }
  }

  s._read =
  function _read() {
    if (queue.length) push();
  };

  s.__enqueue =
  function enqueue(elem) {
    queue.push(elem);
    if (queue.length >= options.maxQueue) {
      queue.splice(0, 1);
    }
    s.emit('readable');
  };

  s.on('readable', push);

  return s;
}