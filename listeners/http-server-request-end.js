/// http-server-request-end

module.exports =
function listener(req, time, timeDiff) {
  return {
    event: 'http-server-request-end',
    trace_id: req.domain._id,
    time: time,
    timeDiff: timeDiff,
    method: req.method,
    path: req.url,
    headers: req.headers,
    host: req.headers.host,
    bytesRead: req.client.bytesRead
  };
};