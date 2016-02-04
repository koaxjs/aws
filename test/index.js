/**
 * Imports
 */

import test from 'tape'
import {aws, awsEffect} from '../src'
import koax from 'koax'

let io = koax()
io.use(awsEffect())

/**
 * Tests
 */

test('should excute s3 get object request', t => {
  io(aws('S3', 'getObject', {
    Bucket: 'test-bucket.weo.io',
    Key: 'test.json'
  })).then(function(data) {
    t.deepEqual(JSON.parse(data.Body.toString()), {
      foo: 'bar'
    })
    t.end()
  })
})
