import React, { PureComponent } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import { getExample } from 'shared/actions'
import { getSomething, getIsNeat } from 'shared/redux/example'
import App from '../components/app'

export default connect(({ example }) => ({
    something: getSomething(example),
    isNeat: getIsNeat(example)
}), (dispatch) => ({
    gimmeSomething: () => dispatch(getExample())
}))(App)