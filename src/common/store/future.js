import {request, error, success} from '../type/markers'
import {fork} from 'fluture'

export const future = () => (next) => {
  const dispatch = dispatchFuture(next)
  return (action) => action.future ? dispatch(action) : next(action)
}

const dispatchFuture = (next) => {
  const request = dispatchRequestAction(next)
  const response = dispatchFutureAction(next)
  return ({future, ...action}) => {
    request(action)
    response(action)(future)
  }
}

const dispatchRequestAction = (next) => ({type, ...action}) => next({
  type: request(type),
  ...action
})

const dispatchFutureAction = (next) => {
  const resolve = resolveAction(next)
  const reject = rejectAction(next)
  return (action) => fork(reject(action), resolve(action))
}

const response = (status) => (next) => ({type, ...action}) => (response) => next({
  ...action,
  type: status(type),
  response
})

const rejectAction = response(error)

const resolveAction = response(success)
