import styles from './sample.css';
console.log(styles);
import html from './sample.pug';
console.log(html);
// import './test.html';

const template = require('!!pug-loader!./sample.pug');
const h = template.apply(template, []);
console.log('html:', h);
