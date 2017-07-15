import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import example from './redux/example'

const LOG = process.env.NODE_ENV !== 'production'
const middleware = LOG ?
    applyMiddleware(thunk, createLogger({ collapsed: true })) :
    applyMiddleware(thunk)
const finalCreateStore = compose(middleware)(createStore)

export default finalCreateStore(combineReducers({
    example
}))
