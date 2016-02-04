/**
 * Imports
 */

import AWS from 'aws-sdk'
import toPromise from '@f/thunk-to-promise'
import readRegion from '@yaws/read-region'
import isObject from '@f/is-object'

/**
 * Action
 */

const AWS_ACTION = 'KOAX_AWS'

/**
 * AWS effect driver that processes AWS actions.
 * @param  {Object} config Optional global config for a AWS.
 * @return {Function}      Redux middleware.
 *
 * AWS Action Payload:
 * 	- `service` - aws service
 * 	- `options` - options for creation of aws service instance
 * 	- `method` - method to call on `service` instance
 * 	- `params` - params for method call
 */

function awsEffect (config) {
  config && AWS.config.update(config)

  if (!AWS.config.region) {
    AWS.config.update(readRegion())
  }

  return (action, next) => {
    if (action.type !== AWS_ACTION) return next()

    let {service, options, method, params} = action.payload

    let serviceI = new (AWS[service])(options)
    return toPromise(serviceI[method].bind(serviceI, params))
  }
}


/**
 * AWS action creator
 * @param  {String|Object} serviceAndOpts Service string or object with `service` and service `options`.
 * @param  {String} method                Service method
 * @param  {Object} params                Service method params
 * @return {Object}                       AWS action
 */

function aws (serviceAndOpts, method, params) {
  let {service, options} = isObject(serviceAndOpts)
    ? serviceAndOpts
    : {service: serviceAndOpts}

  return {type: AWS_ACTION, payload: {service, options, method, params}}
}

/**
 * Exports
 */

export {aws, awsEffect}
