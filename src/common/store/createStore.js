/* eslint-disable no-unused-vars */
import {applyMiddleware, createStore as create, compose} from 'redux'
import {reader} from './reader'
import {future} from './future'

const composeMiddleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const createStore = (deps) => (reducer) => (create)(
  reducer,
  composeMiddleware(applyMiddleware(reader(deps), future))
)
