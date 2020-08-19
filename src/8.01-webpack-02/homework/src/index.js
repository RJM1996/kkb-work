import fn from "./fn";
import { hello } from "./service";
import logo from "./images/logo.png";
import "./css/css.css";

const img = new Image();
img.src = logo;
document.body.appendChild(img);

const btn = document.querySelector("#button");
const name = "荣俊铭";
btn.addEventListener("click", () => {
  console.log(`开课吧-${name}`);
  hello();
});

alert(fn);
console.log(fn);
