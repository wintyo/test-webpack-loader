const path = require('path');
const util = require('loader-utils');
const pug = require('pug');

// const styles = require('../src/sample.css');
// console.log(styles);

module.exports = function(source) {
  console.log(source);
  const query = (typeof this.query === 'string' && this.query[0] === '?') ? util.parseQuery(this.query) : this.query;
  console.log(this.resourcePath);
  console.log(this.addDependency);
  console.log(this.cacheable);
  const options = {
    filename: this.resourcePath,
    doctype: 'js',
    compileDebug: this.debug || false,
    ...query,
  };
  let template;
  try {
    template = pug.compile(source, options);
  } catch (ex) {
    this.callback(ex);
    return;
  }
  const data = {
    requireCss: (url) => {
      const u = path.resolve(path.dirname(this.resourcePath), url);
      this.loadModule(u, (err, source, map, module) => {
        console.log('err:', err);
        console.log('source:', source);
        // console.log('map:', map);
        // console.log('module:', module);
      });
      return url;
    },
    ...query.data,
  };
  console.log(template(data));
  return '';
};
