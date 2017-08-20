export const SET_EXAMPLE = 'SET_EXAMPLE'
export const RESET_EXAMPLE = 'RESET_EXAMPLE'

const defaults = {
    something: '',
    isNeat: true
}

export default (state=defaults, action={}) => {
    switch (action.type) {
        case SET_EXAMPLE:
            return {...state, something: action.something}
        case RESET_EXAMPLE:
            return defaults
        default:
            return state
    }
}

export const setExample = something => ({ type: SET_EXAMPLE, something })
export const resetExample = () => ({ type: RESET_EXAMPLE })

export const getSomething = state => state.something
export const getIsNeat = state => state.isNeat
