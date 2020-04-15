module.exports = {
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        Link: ['next/link', 'default'],
        PropTypes: 'prop-types',
        React: 'react',
        Fragment: ['react', 'Fragment'],
        Component: ['react', 'Component'],
      }),
    );
    return config;
  },
};
