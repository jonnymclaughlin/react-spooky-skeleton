import App from './components/app'

global.renderScene = () => {
    new App({
        el: document.getElementById('container'),
    })
}
