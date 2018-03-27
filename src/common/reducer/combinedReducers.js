import {combineReducers} from 'redux'
import {users} from '../../userlist/reducer'
import {user} from '../../user/reducer'

export const combined = combineReducers({
  users,
  user
})
