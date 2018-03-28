import queryString from 'querystring'

const buildQuery = (queryParams) => {
  return cleanUrl('?' + queryString.stringify(queryParams))
}

const cleanUrl = (url) => {
  if (url.endsWith('&') || url.endsWith('?')) {
    return url.substring(0, url.length - 1)
  }
  return url
}

const method = (method) => (path, {query, body, headers, ...options} = {}) => ({
  url: buildUrl(path, query),
  body,
  method,
  headers,
  options
})

export const buildUrl = (path, queryParams) => path + buildQuery(queryParams)

export const GET = method('GET')

export const POST = method('POST')

export const PUT = method('PUT')

export const PATCH = method('PATCH')

export const DELETE = method('DELETE')

