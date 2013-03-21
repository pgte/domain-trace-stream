/// http-client-request-end

module.exports =
function listener(req, time, timeDiff) {
  return {
    event: 'http-client-request-end',
    trace_id: req.domain._id,
    time: time,
    timeDiff: timeDiff,
    method: req.method,
    path: req.path,
    host: req._headers.host,
    header: req._header
  };
};