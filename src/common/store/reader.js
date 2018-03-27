import {READER} from '../type/markers'

export const reader = (deps) => () => (next) => {
  const apply = applyDependencies(deps)(next)
  return (action) => action.type === READER ? apply(action) : next(action)
}

const applyDependencies = (deps) => (next) => ({action}) => next(action(deps))
