import {READER} from '../type/markers'

export const reader = (action) => function() {
  return {
    type: READER,
    action: action.apply(null, arguments)
  }
}
