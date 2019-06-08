// vue.config.js
const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "./src/assets/styles/_variables.scss";',
      },
    },
  },
};
