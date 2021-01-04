import { createStore } from 'redux'
import { appReducer } from '../reducers/app'

export const store = createStore(appReducer)
