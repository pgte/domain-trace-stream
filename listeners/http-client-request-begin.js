/// http-client-request-begin

module.exports =
function listener(req, time, timeDiff) {
  return {
    event: 'http-client-request-begin',
    time: time,
    timeDiff: timeDiff,
    method: req.method,
    path: req.path,
    host: req._headers.host,
  };
};