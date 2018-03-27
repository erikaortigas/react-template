import {reducerOf} from '../common/reducer/reducerOf'
import {LOAD_USERS} from './type'
import {success} from '../common/type/markers'

const defaultState = () => []

const loadUsers = () => ({response}) => response

export const users = reducerOf({
  [success(LOAD_USERS)]: loadUsers
})(defaultState)
