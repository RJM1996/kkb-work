import libs from './libs/fn.js';
import kkbTxt from './data/kkb.txt';
import logo from './images/logo.png';
import indexCss from './css/index.css';

libs.fn();

console.log('kkbTxt', kkbTxt);

console.log('logo', logo);

console.log('css', indexCss);

// let logoImage = new Image();
// logoImage.src = logo;

// document.body.appendChild(logoImage);


// let styleEle = document.createElement('style');
// styleEle.innerHTML = indexCss[0][1];
// document.head.appendChild(styleEle);