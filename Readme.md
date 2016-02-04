
# aws

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

AWS SDK effect driver.

## Installation

    $ npm install @koax/aws

## Usage

```js
import {aws, awsEffect} from 'redux-effects-aws'
import koax from 'koax'

const io = koax()
io.use(awsEffect())

// run update
io(testableUpdate)

// Action creator that updates an s3 object.
function * testableUpdate () {
  // get object
  let data = yield aws('S3', 'getObject', {
    Bucket: 'test-bucket.weo.io',
    Key: 'test.json'
  })
  let obj = JSON.parse(data.BODY.toString())

  // update
  obj.foo = 'qux'

  // put object
  yield aws('S3', 'putObject', {
    Bucket: 'test-bucket.we.io',
    Key: 'test.json',
    Body: JSON.stringify(obj)
  })
}
```

## API

### awsEffect (config)
Effect driver.

- `config` - global AWS config (e.g. region, output...)

**Returns:** redux effects middleware

### aws (service, method, params)
Action creator.

  - `service` - The aws service. Optionally can be an object with the signature:
                {service, options}, if you need to specify service options.
  - `method` - Method to call on service.
  - `params` - Params to use for call.


## License

MIT

[travis-image]: https://img.shields.io/travis/koaxjs/aws.svg?style=flat-square
[travis-url]: https://travis-ci.org/koaxjs/aws
[git-image]: https://img.shields.io/github/tag/koaxjs/aws.svg
[git-url]: https://github.com/koaxjs/aws
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@koax/aws.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@koax/aws
