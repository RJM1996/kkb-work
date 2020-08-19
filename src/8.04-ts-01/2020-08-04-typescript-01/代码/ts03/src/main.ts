import { getUser } from "./api/getUser";
import Drag from "./libs/Drag";

console.log("Hello TypeScript!!!");

let button = document.querySelector("button") as HTMLElement
button.addEventListener("click", async () => {
  let rs = await getUser<{ id: number }>({ id: 1 });
  rs.username;
  rs.age;
  console.log(rs);
});

let ele = document.querySelector(".ele-div") as HTMLElement;
let drag = new Drag(ele);
console.log(drag);
