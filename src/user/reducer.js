import {reducerOf} from '../common/reducer/reducerOf'
import {success} from '../common/type/markers'
import {LOAD_USER} from './type'

const defaultState = () => null

const loadUser = () => ({response}) => response

export const user = reducerOf({
  [success(LOAD_USER)]: loadUser
})(defaultState)
