import reduce from 'ramda/src/reduce'
import toPairs from 'ramda/src/toPairs'
import compose from 'redux/src/compose'
import * as user from './user'

const inject = (deps) =>
  compose(reduce((injected, [key, api]) => ({...injected, [key]: api(deps)}), {}), toPairs)

export const api = (deps) =>
  reduce((api, [key, apis]) => ({...api, [key]: inject(deps)(apis)}), {}, toPairs({
    user
  }))
