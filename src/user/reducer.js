import {reducerOf} from '../common/reducer/reducerOf'

const defaultState = () => ({
  firstName: 'Clyde',
  lastName: 'Espeno',
  dateOfBirth: 'January 6, 1990'
})

export const user = reducerOf({})(defaultState)
