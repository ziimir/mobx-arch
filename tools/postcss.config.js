let mq = {
    '--small': 'screen',
    '--medium': 'screen and (min-width: 48em)',
    '--large': 'screen and (min-width: 64.0625em)',
    '--xlarge': 'screen and (min-width: 90.0625em)',
    '--xxlarge': 'screen and (min-width: 120.0625em)'
};

module.exports = {
    plugins: [
        require('postcss-import')(),
        require('postcss-custom-media')({
            extensions: mq
        }),
        require('postcss-custom-properties')(),
        require('postcss-calc')(),
        require('postcss-nested')(),
        require('autoprefixer')()
    ]
}
