import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {render} from '../app'
import {createStore} from 'redux'
import {AppContainer} from 'react-hot-loader'
import {combined} from '../common/reducer/combinedReducers'

const launch = (store, render) => {
  ReactDOM.render(
    <AppContainer>
      {render(store)}
    </AppContainer>,
    document.getElementById('root')
  )
}

let store = createStore(combined)
launch(store, render)

// stupid hack needed to avoid dynamic imports from being transpiled incorrectly when
// hot module reload is turned off
const alwaysFalse = false
if (module.hot || alwaysFalse) {

  module.hot.accept('../app',
    () => import('../app').then(({render}) => launch(render, store))
  )

  module.hot.accept('../common/reducer/combinedReducers',
    () => import('../common/reducer/combinedReducers').then(({combined}) => {
      store = createStore(combined)
      launch(store, render)
    })
  )
}
