import {LOAD_USERS} from './type'
import {reader} from '../common/action/reader'

export const loadUsers = reader((id) => ({api}) => ({
  type: LOAD_USERS,
  future: api.user.getAll(id)
}))
