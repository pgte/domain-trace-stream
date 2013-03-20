/// http-client-response-end

module.exports =
function listener(res, time, timeDiff) {
  var req = res.client._httpMessage;

  return {
    event: 'http-client-response-end',
    time: time,
    timeDiff: timeDiff,
    headers: res.headers,
    statusCode: res.statusCode,
    method: req.method,
    path: req.path,
    host: req._headers.host,
    bytesRead: res.client.bytesRead
  };
};