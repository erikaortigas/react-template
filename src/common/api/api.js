import reduce from 'ramda/es/reduce'
import toPairs from 'ramda/es/toPairs'
import {Future} from 'fluture'
import {ACTIVE, PENDING} from '../user/status'

export const user = () => ({
  get: (id) => Future.of({
    id,
    firstName: `first-${id}`,
    lastName: `last-${id}`,
    dateOfBirth: (new Date()).toString()
  }),
  getAll: () => Future.of([{
    name: 'Surya',
    id: '1',
    status: ACTIVE
  }, {
    name: 'Clyde',
    id: '2',
    status: PENDING
  }])
})

export const api = (config) =>
  reduce((api, [key, apiFn]) => ({...api, [key]: apiFn(config)}), {}, toPairs({
    user
  }))
