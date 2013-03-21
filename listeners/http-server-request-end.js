/// http-server-request-end

module.exports =
function listener(res, time, timeDiff) {
  var req = res.req;
  return {
    event: 'http-server-request-end',
    time: time,
    timeDiff: timeDiff,
    method: res.method,
    path: res.url,
    headers: res.headers,
    host: res.headers.host,
    bytesRead: res.client.bytesRead
  };
};