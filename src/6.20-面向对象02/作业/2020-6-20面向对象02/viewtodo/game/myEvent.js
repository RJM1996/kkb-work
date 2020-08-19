export default class MyEvent {
  constructor() {
    this.handler = {};
  }
  // 添加事件
  addEvent(eventName, fn) {
    if (typeof this.handler[eventName] === "undefined") {
      this.handler[eventName] = [];
    }
    this.handler[eventName].push(fn);
  }
  // 触发事件
  trigger(eventName, arg) {
    if (typeof this.handler[eventName] === "undefined") {
      return;
    }
    this.handler[eventName].forEach((v) => {
      v(arg);
    });
  }
  // 作业： 移除事件方法补全
  removeEvent(eventName, fn) {
    if (typeof this.handler[eventName] === "undefined") {
      return;
    }
    this.handler[eventName].forEach((v, index) => {
      if (v === fn) {
        this.handler[eventName].splice(index, 1);
      }
    });
  }
}
