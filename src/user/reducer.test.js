import {user} from './reducer'

describe('users.reducer', () => {
  it('provides default state', () => {
    expect(user()).to.deep.equal([])
  })
})
