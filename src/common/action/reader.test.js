import {reader} from './reader'
import {READER} from '../type/markers'

describe('reader', () => {

  it('applies the reader to a dispatcheable payload', () => {
    const readable = reader((payload) => ({api}) => ({
      type: 'TEST',
      future: api.get(payload)
    }))
    const api = {get: spy(() => {})}
    const dispatchedReader = readable('hello')
    const dispatchedAction = dispatchedReader.action({api})

    expect(dispatchedReader.type).to.equal(READER)
    expect(dispatchedAction.type).to.equal('TEST')
    expect(api.get).to.have.been.calledWith('hello')
  })
})
