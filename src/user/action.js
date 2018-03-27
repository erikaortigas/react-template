import {LOAD_USER} from './type'
import {reader} from '../common/action/reader'

export const loadUser = reader((id) => ({api}) => ({
  type: LOAD_USER,
  future: api.user.get(id)
}))
