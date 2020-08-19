// 类型标注
export default class Drag {
  // ts 中类的属性必须单独定义
  el: HTMLElement;
  x: number;
  y: number;
  isDrag: Boolean;

  constructor(el: HTMLElement) {
    this.el = el;
    this.x = 0;
    this.y = 0;
    this.isDrag = false;

    this.down();
    this.move();
    this.up();
  }

  down() {
    this.el.addEventListener("mousedown", (e) => {
      console.log('mousedown')
      this.isDrag = true;
      this.x = e.clientX - this.el.offsetLeft;
      this.y = e.clientY - this.el.offsetTop;
      console.log(this.x, this.y)
    });
  }

  move() {
    this.el.addEventListener("mousemove", (e) => {
      console.log('mousemove')
      if (this.isDrag) {
        this.el.style.left = e.clientX - this.x + "px";
        this.el.style.top = e.clientY - this.y + "px";
        console.log(this.el.style.left, this.el.style.top)
      }
    });
  }

  up() {
    this.el.addEventListener("mouseup", (e) => {
      console.log('mouseup')
      this.isDrag = false;
    });
  }
}
