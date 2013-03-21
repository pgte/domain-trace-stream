/// http-server-response-end

module.exports =
function listener(res, time, timeDiff) {
  var req = res.__req;
  return {
    event: 'http-server-response-end',
    trace_id: req.domain._id,
    time: time,
    timeDiff: timeDiff,
    method: req.method,
    path: req.url,
    headers: req.headers,
    host: req.headers.host,
    statusCode: res.statusCode
  };
};