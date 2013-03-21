/// http-server-response-end

module.exports =
function listener(res, time, timeDiff) {
  console.log('res.statusCode:', res.statusCode);
  var req = res.__req;
  return {
    event: 'http-server-response-end',
    time: time,
    timeDiff: timeDiff,
    method: req.method,
    path: req.url,
    headers: req.headers,
    host: req.headers.host,
    statusCode: res.statusCode
  };
};