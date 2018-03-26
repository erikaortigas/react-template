import * as React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from 'material-ui/CssBaseline'
import {Provider} from 'react-redux'
import Users from './users/users'

export const App = ({store}) =>
  <Provider store={store}>
    <div>
      <CssBaseline/>
      <Users/>
    </div>
  </Provider>

App.propTypes = {
  store: PropTypes.object.isRequired
}

export const render = (store) => <App store={store}/>
