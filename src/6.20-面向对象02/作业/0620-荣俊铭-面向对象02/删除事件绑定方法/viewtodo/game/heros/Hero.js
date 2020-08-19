import MyEvent from "../myEvent.js";

// 英雄基类；
export default class Hero extends MyEvent {
  constructor(name, skills, ico) {
    super();
    this.name = name;
    this.skills = skills;
    this.ico = ico;
    // 自定义事件绑定；
    this.addEvent("heroInit", this.init);
    this.addEvent("heroInit", this.init01);
    this.addEvent("heroInit", this.init02);
    
    // 删除事件 heroInit 上的 init 方法
    this.removeEvent('heroInit', this.init)
    console.log(this.handler)
  }
  init(name) {
    console.log(name + " 初始化01...");
  }
  init01(name) {
    console.log(name + " 初始化02...");
  }
  init02(name) {
    console.log(name + " 初始化03...");
  }
}
