import {reducerOf} from './reducerOf'

describe('core reducer utils', () => {
    it('creates a reducer with default props', () => {
        const reducer = reducerOf()(() => ({foo: 'bar'}))
        expect(reducer()).to.deep.equal({foo: 'bar'})
    })

    it('accepts defaultHandler', () => {
        const defaultHandler = sinon.spy((state) => () => state)
        const reducer = reducerOf({default: defaultHandler})(() => ({
          foo: 'bar'
        }))
        const state = reducer()
        expect(state).to.deep.equal({foo: 'bar'})
        expect(defaultHandler).to.have.been.calledWith({foo: 'bar'})
    })
})
