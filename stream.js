var Readable = require('stream').Readable;

module.exports =
function Stream(options) {

  /// Queue
  var queue = [];
  
  /// Readable Stream

  var s = new Readable({objectMode: true});

  s._read =
  function _read() {
    return;
    if (queue.length) {
      var pump = true;
      var elem;
      while (queue.length && pump) {
        elem = queue.splice(0, 1)[0];
        console.log('pushing (2)', elem);
        pump = this.push(elem);
      }
    }
  };

  s.__enqueue =
  function enqueue(elem) {
    s.push(elem);
    s.emit('readable');
    // if (queue.length >= options.maxQueue) {
    //   queue.splice(0, 1);
    // }
  };

  return s;
}