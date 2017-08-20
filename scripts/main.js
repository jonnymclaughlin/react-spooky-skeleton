import React from 'react' // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import store from './shared/store'
import App from './containers/app'

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('container')
)
