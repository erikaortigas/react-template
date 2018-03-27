import * as React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from 'material-ui/CssBaseline'
import {Provider} from 'react-redux'
import UserList from './userlist/userlist'
import User from './user/user'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

export const App = ({store}) =>
  <Provider store={store}>
    <div>
      <CssBaseline/>
      {renderRouter()}
    </div>
  </Provider>

const renderRouter = () =>
  <Router>
    <Switch>
      <Route exact path='/' render={renderUsers}/>
      <Route exact path='/user/:userId' render={renderUser}/>
    </Switch>
  </Router>

const renderUsers = () => <UserList/>

// eslint-disable-next-line react/prop-types
const renderUser = ({match}) => <User userId={match.params.userId}/>

App.propTypes = {
  store: PropTypes.object.isRequired
}

export const render = (store) => <App store={store}/>
