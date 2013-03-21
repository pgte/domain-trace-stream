# domain-trace-stream [![Build Status](https://secure.travis-ci.org/pgte/domain-trace-stream.png)](http://travis-ci.org/pgte/domain-trace-stream)

Provides an event stream with all the interesting IO events.

## Install

```bash
$ npm install domain-trace-stream
```

## Use

```javascript
var DomainTraceStream = require('domain-trace-stream');

var stream = DomainTraceStream();
```

Or, with options:

```javascript
var stream = DomainTraceStream({
  maxQueue: 1000 // default value
});
```

The stream emits objects like this:

```javascript
{
  event: 'http-client-request-begin',
  trace_id: '1b506b1b-0dd9-4d18-957e-7e1c5e6bf0b3',
  time: 1363873938335518,
  timeDiff: 194623,
  method: 'GET',
  path: '/search.json',
  headers: {
    "host": "search.twitter.com",
    "content-type": "application/json"  
  },
  host: "search.twitter.com"
}
```

The emitted events are:

* `http-client-request-begin`
* `http-client-request-end`
* `http-client-response-begin`
* `http-client-response-end`
* `http-server-request-begin`
* `http-server-request-end`
* `http-server-response-end`

## License

MIT