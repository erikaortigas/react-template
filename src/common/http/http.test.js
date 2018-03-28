import {createClient} from './http'
import {GET, DELETE, PATCH, POST, PUT, buildUrl} from './method'

describe('http', () => {

  const sandbox = sinon.sandbox.create()
  const fetchSpy = sandbox.spy(() => Promise.resolve())
  const http = createClient(fetchSpy)

  afterEach(() => {
    sandbox.reset()
  })

  it('gets', async () => {
    await http(GET('/hello/world')).promise()
    expect(fetchSpy).to.have.been.calledWith('/hello/world', {
      headers: {},
      method: 'GET'
    })
  })

  it('gets with parameters', async () => {
    await http(GET('/hello/world', {query: {say: 'hi'}})).promise()
    expect(fetchSpy).to.have.been.calledWith('/hello/world?say=hi', {
      headers: {},
      method: 'GET'
    })
  })

  it('gets with headers', async () => {
    await http(GET('/hello/world', {query: {say: 'hi'}, headers: {head: 'hunter'}})).promise()
    expect(fetchSpy).to.have.been.calledWith('/hello/world?say=hi', {
      headers: {head: 'hunter'},
      method: 'GET'
    })
  })

  it('posts', async () => {
    await http(POST('/post')).promise()
    expect(fetchSpy).to.have.been.calledWith('/post', {
      headers: {},
      method: 'POST'
    })
  })

  it('posts with json body', async () => {
    await http(POST('/post', {body: {please: 'post'}})).promise()
    expect(fetchSpy).to.have.been.calledWith('/post', {
      body: JSON.stringify({please: 'post'}),
      headers: {'content-type': 'application/json'},
      method: 'POST'
    })
  })

  it('posts with string body', async () => {
    await http(POST('/post', {body: 'please post'})).promise()
    expect(fetchSpy).to.have.been.calledWith('/post', {
      body: 'please post',
      headers: {'content-type': 'text/plain'},
      method: 'POST'
    })
  })

  it('posts with string body with explicit content type', async () => {
    await http(POST('/post', {
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({please: 'post'})
    })).promise()
    expect(fetchSpy).to.have.been.calledWith('/post', {
      body: JSON.stringify({please: 'post'}),
      headers: {'content-type': 'application/json'},
      method: 'POST'
    })
  })

  it('puts', async () => {
    await http(PUT('/put', {body: {please: 'put'}})).promise()
    expect(fetchSpy).to.have.been.calledWith('/put', {
      body: JSON.stringify({please: 'put'}),
      headers: {'content-type': 'application/json'},
      method: 'PUT'
    })
  })

  it('patches', async () => {
    await http(PATCH('/patch', {body: {please: 'patch'}})).promise()
    expect(fetchSpy).to.have.been.calledWith('/patch', {
      body: JSON.stringify({please: 'patch'}),
      headers: {'content-type': 'application/json'},
      method: 'PATCH'
    })
  })

  it('deletes', async () => {
    await http(DELETE('/delete')).promise()
    expect(fetchSpy).to.have.been.calledWith('/delete', {
      headers: {},
      method: 'DELETE'
    })
  })

  it('builds url', () => {
    expect(buildUrl('/foo', {bar: 'baz'})).to.equal('/foo?bar=baz')
  })
})
