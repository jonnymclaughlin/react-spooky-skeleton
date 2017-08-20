import path from 'path'

export default {
    modules: [path.resolve(__dirname), 'node_modules'],
    alias: {
        shared: path.resolve('./scripts/shared'),
        components: path.resolve('./scripts/components'),
    },
    extensions: ['.js', '.css', '.vs', '.fs'],
}
