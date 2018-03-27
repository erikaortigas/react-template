import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {App} from '../app'
import {createStore} from 'redux'
import {AppContainer} from 'react-hot-loader'
import {combined} from '../common/reducer/combinedReducers'

const launch = (store) => {
  ReactDOM.render(
    <AppContainer>
      <App store={store}/>
    </AppContainer>,
    document.getElementById('root')
  )
}

launch(createStore(combined))

if (module.hot) {
  module.hot.accept()
}
