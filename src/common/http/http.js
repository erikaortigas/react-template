import isEmpty from 'ramda/src/isEmpty'
import isNil from 'ramda/src/isNil'
import {tryP} from 'fluture'

const headers = (opts) => {
  if (isEmpty(opts.headers) && isNil(body)) {
    return {}
  }
  return determineContentType(opts)
}

const determineContentType = (opts) => {
  const headers = opts.headers || {}
  if (opts.body && !headers['content-type']) {
    headers['content-type'] = getType(opts.body)
  }
  return {headers}
}

const getType = (body) => {
  const bodyType = typeof body
  if (bodyType === 'string') {
    return 'text/plain'
  }
  if (bodyType === 'object') {
    return 'application/json'
  }
  return undefined
}

const body = (body) => {
  if (!isNil(body)) {
    if (typeof body === 'object') {
      return {body: JSON.stringify(body)}
    }
    return {body}
  }
  return undefined
}

export const createClient = (fetch) => (opts) => tryP(() => fetch(opts.url, {
  ...body(opts.body),
  ...headers(opts),
  ...opts.options,
  method: opts.method
}))
