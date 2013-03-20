/// http-client-response-begin

module.exports =
function listener(res, time, timeDiff) {
  var req = res.client._httpMessage;

  return {
    event: 'http-client-response-begin',
    time: time,
    timeDiff: timeDiff,
    headers: res.headers,
    statusCode: res.statusCode,
    method: req.method,
    path: req.path,
    host: req._headers.host
  };
};