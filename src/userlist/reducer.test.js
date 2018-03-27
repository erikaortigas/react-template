import {users} from './reducer'

describe('users.reducer', () => {
  it('provides default state', () => {
    expect(users()).to.deep.equal([])
  })
})
