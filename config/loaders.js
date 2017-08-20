const plugins = ['transform-decorators-legacy', 'transform-runtime']

const env = [
    'env',
    {
        useBuiltIns: true,
        modules: false,
        loose: true,
    },
]

export default function() {
    return [
        {
            test: /\.jsx?$/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [env, 'es2015', 'stage-0'],
                        plugins: plugins,
                    },
                },
            ],
            exclude: /node_modules/,
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 1,
                    },
                },
                'postcss-loader',
            ],
            exclude: /node_modules/,
        },
        {
            test: /\.(vs|fs)$/,
            use: [{ loader: 'shader-loader' }],
            exclude: /node_modules/,
        },
    ]
}
