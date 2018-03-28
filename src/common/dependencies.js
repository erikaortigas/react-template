import {api} from './api/api'
import {config} from './config'
import {createClient} from './http/http'
import {ACTIVE, PENDING} from './user/status'

const response = {
  GET: {
    'http://localhost:3001/user': [{
      name: 'Surya',
      id: '1',
      status: ACTIVE
    }, {
      name: 'Clyde',
      id: '2',
      status: PENDING
    }],
    'http://localhost:3001/user/1': {
      id: '1',
      firstName: `Surya`,
      lastName: `Dharma`,
      dateOfBirth: (new Date()).toString()
    },
    'http://localhost:3001/user/2': {
      id: '2',
      firstName: `Clyde`,
      lastName: `Espeno`,
      dateOfBirth: (new Date()).toString()
    }
  }
}

const fetch = (url, {method}) => {
  return Promise.resolve({
    json: () => {
      window.console.log('resolving json', url, method)
      window.console.log('response is', response[method][url])
      return Promise.resolve(response[method][url])
    }
  })
}

const http = createClient(fetch)

export const dependencies = () => ({
  api: api({config, http})
})
