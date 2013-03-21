/// http-server-request-begin

module.exports =
function listener(req, time, timeDiff) {
  req.__res = req.socket._httpMessage;
  req.__res.__req = req;
  return {
    event: 'http-server-request-begin',
    trace_id: req.domain._id,
    time: time,
    timeDiff: timeDiff,
    method: req.method,
    path: req.url,
    headers: req.headers,
    host: req.headers.host,
  };
};