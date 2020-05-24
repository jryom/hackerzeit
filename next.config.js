/* eslint-disable no-param-reassign */
const path = require('path');

module.exports = {
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        Link: ['next/link', 'default'],
        PropTypes: 'prop-types',
        React: 'react',
        Fragment: ['react', 'Fragment'],
        Component: ['react', 'Component'],
      })
    );
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};
