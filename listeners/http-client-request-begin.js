/// http-client-request-begin

module.exports =
function listener(req, time, timeDiff) {
  return {
    event: 'http-client-request-begin',
    trace_id: req.domain._id,
    time: time,
    timeDiff: timeDiff,
    method: req.method,
    path: req.path,
    headers: req._headers,
    host: req._headers.host
  };
};