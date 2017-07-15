// import fetch from 'isomorphic-fetch'
// import appendQuery from 'append-query'
import es6promise from 'es6-promise'
es6promise.polyfill()

// All your api calls can live here!
// It'll be fun!
export function fetchExample() {
    // const params = {
    //     something: 'nice'
    // }
    // return fetch(appendQuery('/', params))
    return Promise.resolve('https://media.giphy.com/media/3o7TKrxikLN0d3Vb2g/giphy.gif')
}