/// http-server-request-begin

module.exports =
function listener(req, time, timeDiff) {
  return {
    event: 'http-server-request-begin',
    time: time,
    timeDiff: timeDiff,
    method: req.method,
    path: req.url,
    headers: req.headers,
    host: req.headers.host,
  };
};