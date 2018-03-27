import {reducerOf} from '../common/reducer/reducerOf'

const defaultState = () => [{
  name: 'Clyde'
}]

export const users = reducerOf({})(defaultState)
