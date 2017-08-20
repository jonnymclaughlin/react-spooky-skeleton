import { fetchExample } from './redux/api'
import { setExample } from './redux/example'

export function getExample() {
    return function(dispatch) {
        return fetchExample()
            .then(something =>
                dispatch(setExample(something))
            )
    }
}
