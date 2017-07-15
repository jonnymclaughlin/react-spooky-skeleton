import path from 'path'
import { entries, hotEntries } from './config/entries'
import { prodPlugins, devPlugins } from './config/plugins'
import loadersConfig from './config/loaders'
import resolveConfig from './config/resolve'

export default (env) => {
    const isProd = env === 'production'

    if (isProd) {
        return {
            entry: entries,
            output: {
                path: path.join(__dirname, 'dist'),
                filename: '[name].bundle.js',
                publicPath: '/'
            },
            resolve: resolveConfig,
            devtool: 'source-map',
            plugins: prodPlugins,
            module: {
                rules: loadersConfig(isProd)
            }
        }
    }

    return {
        entry: hotEntries,
        output: {
            path: __dirname,
            filename: '[name].bundle.js',
            publicPath: '/static/'
        },
        resolve: resolveConfig,
        devtool: 'eval-source-map',
        devServer: {
            inline: true,
            hot: true,
            historyApiFallback: true
        },
        plugins: devPlugins,
        module: {
            rules: loadersConfig(isProd)
        }
    }
}
