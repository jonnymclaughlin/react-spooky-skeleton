import webpack from 'webpack'
import autoprefixer from 'autoprefixer'

const sharedPlugins = [
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [
                autoprefixer({
                    browsers: ['last 2 versions', 'safari 8']
                }),
                require('postcss-nested')()
            ]
        }
    })
]


export const prodPlugins = [
    ...sharedPlugins
]

export const devPlugins = [
    ...sharedPlugins,
    new webpack.HotModuleReplacementPlugin()
]
