class Vue {
  constructor(options) {
    this.$options = options;
    this._data = options.data;
    this.observer(this._data);
    this.compile();
  }
  observer(data) {
    for (let key in data) {
      let value = data[key];
      let dep = new Dep();
      Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() {
          console.log("get...");
          if (Dep.target) {
            // 当data中的一个属性被获取的时候, 给这个属性添加一个watcher(订阅者)
            // 收集watcher, Dep.target 就是一个 watcher
            dep.addSub(Dep.target);
          }
          console.log(dep);
          return value;
        },
        set(newValue) {
          console.log("set...");
          // 当data中的一个属性被修改的时候, 就触发这个属性所有订阅者(watcher)的update方法
          dep.notify(newValue);
          value = newValue;
        },
      });
    }
  }

  compile() {
    let ele = document.querySelector(this.$options.el);
    this.compileNodes(ele);
  }
  compileNodes(ele) {
    let childNodes = ele.childNodes;
    // console.log(childNodes);
    childNodes.forEach((node) => {
      // console.log(node);
      // 文本  元素节点;
      if (node.nodeType === 1) {
        //    元素节点
        let attrs = node.attributes;
        console.log(attrs);
        [...attrs].forEach((attr) => {
          // console.log(attr);
          let attrName = attr.name;
          let attrValue = attr.value;
          console.log(attrName, attrValue);
          if (attrName === "v-text") {
            node.innerText = this._data[attrValue];
          } else if (attrName === "v-model") {
            node.value = this._data[attrValue];
            node.addEventListener("input", (e) => {
              // console.log(e.target.value);
              // 触发视图更新
              this._data[attrValue] = e.target.value;
            });
          } else if (attrName === "v-html") {
            node.innerHTML = this._data[attrValue];
          }
        });

        // 递归子节点
        if (node.childNodes.length > 0) {
          this.compileNodes(node);
        }
      } else if (node.nodeType === 3) {
        // 文本节点
        // 匹配 {{}} 中的文本
        let reg = /\{\{\s*([^\{\}\s]+)\s*\}\}/g;
        let textContent = node.textContent;
        console.log("文本节点\n", textContent);
        if (reg.test(textContent)) {
          console.log("有大括号表达式");
          // 获取数据的下标
          // RegExp  Function  Object
          let $1 = RegExp.$1;
          // RegExp.$2
          // console.log($1);
          let rData = this._data[$1];
          if (rData === undefined) {
            node.textContent = '' // 渲染为空
            throw Error(
              `'Property or method "${$1}" is not defined on the instance but referenced during render'`
            );
          } else {
            node.textContent = node.textContent.replace(reg, rData);
            // 当data中的一个属性在dom中被匹配到之后, 说明该处使用了这个属性, 所以就在此时给该属性创建一个watcher(订阅者)
            // 当这个属性的值在其他地方被修改时, 就会触发这个属性所有的watcher的update方法, 将所有用到这个属性的地方的该属性值进行修改
            // 实例化watcher --> 重新编译模板
            new Watcher(this._data, $1, (newValue) => {
              let oldValue = this._data[$1];
              let reg = new RegExp(oldValue);
              node.textContent = node.textContent.replace(reg, newValue);
            });
          }
        }
      }
    });
  }
}

// 依赖收集器
class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  // 发布；
  notify(newValue) {
    this.subs.forEach((sub) => {
      sub.update(newValue);
    });
  }
}

// 订阅者；
class Watcher {
  constructor(data, key, cb) {
    Dep.target = this;
    // 触发get 添加到dep里；
    data[key];
    this.cb = cb;
    Dep.target = null;
  }
  update(newValue) {
    console.log("update...");
    this.cb(newValue);
  }
}
