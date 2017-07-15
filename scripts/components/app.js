import React, { PureComponent } from 'react' //eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

export default class extends PureComponent {
    static propTypes = {
        something: PropTypes.string,
        isNeat: PropTypes.bool,
        gimmeSomething: PropTypes.func.isRequired
    }
    static defaultProps = {
        isNeat: false
    }
    componentWillMount() {
        const { gimmeSomething } = this.props
        gimmeSomething()
    }
    render() {
        const { something } = this.props
        return (
            <img src={something} alt="" />
        )
    }
}
