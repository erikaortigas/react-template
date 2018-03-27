import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {App} from '../app'
import {AppContainer} from 'react-hot-loader'
import {combined} from '../common/reducer/combinedReducers'
import {createStore} from '../common/store/createStore'
import {dependencies} from '../common/dependencies'

const launch = (store) => {
  ReactDOM.render(
    <AppContainer>
      <App store={store}/>
    </AppContainer>,
    document.getElementById('root')
  )
}

launch(createStore(dependencies())(combined))

if (module.hot) {
  module.hot.accept()
}
