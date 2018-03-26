import chai, {expect} from 'chai'
import sinon, {spy, mock} from 'sinon'
import {mount, render, shallow} from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import chaiMatchPattern from 'chai-match-pattern'
import sinonChai from 'sinon-chai'
import dirtyChai from 'dirty-chai'
import {before, afterEach, after, done} from 'mocha'
import PropTypes from 'prop-types'
import {JSDOM} from 'jsdom'
import module from 'module'
import {URLSearchParams} from 'url'
import reduce from 'ramda/src/reduce'
import compose from 'ramda/src/compose'
import toPairs from 'ramda/src/toPairs'
import is from 'ramda/src/is'

chai.use(dirtyChai)
chai.use(sinonChai)
chai.use(chaiEnzyme())
chai.use(chaiMatchPattern)

const dom = new JSDOM('<!DOCTYPE html>')
global.dom = dom
global.window = dom.window
global.document = dom.window.document
global.URL = dom.window.URL
global.navigator = {
  userAgent: {
    match: () => {},
    indexOf: () => {}
  }
}

global.expect = expect
global.sinon = sinon
global.spy = spy
global.mock = mock
global.done = done
global.stub = sinon.stub

global.mount = mount
global.render = render
global.shallow = shallow

global.before = before
global.afterEach = afterEach
global.after = after

global.URLSearchParams = URLSearchParams

const createMount = (mount) => (context, childContextTypes = {}) => (node) => mount(node, {
  context,
  childContextTypes: {...mapKnownContextTypes(context), ...childContextTypes}
})

const contextTypes = {
  muiTheme: PropTypes.object,
  store: PropTypes.object,
  router: PropTypes.object
}

const mapKnownContextTypes = compose(
  reduce((ctxs, [, key]) => ({
    ...ctxs,
    [key]: contextTypes[key]
  }), {}),
  toPairs
)

global.mountWithVariableContext = createMount(mount)

global.shallowWithVariableContext = createMount(shallow)

global.applyActions = (reducer, initial = reducer(undefined, {})) => (...actions) =>
  reduce(actionReducer(reducer), initial, is(Array, actions[0]) ? actions[0] : actions)

const actionReducer = (reducer) => (state, action) => {
  const invoked = invokeAction(action)
  return reducer(state, invoked)
}

const invokeAction = (action) =>
  typeof action === 'function' ? action() : action

const moduleLoad = module.Module._load
const returnEmptyModule = (request, parent, isMain) =>
  request.startsWith('file-loader') ? {} : moduleLoad(request, parent, isMain)

module.Module._load = returnEmptyModule

require.extensions['.css'] = () => {}
require.extensions['.less'] = () => {}
require.extensions['.png'] = () => {}
require.extensions['.svg'] = () => {}
require.extensions['.jpg'] = () => {}
require.extensions['.jpeg'] = () => {}
require.extensions['.gif'] = () => {}
require.extensions['.html'] = () => {}
