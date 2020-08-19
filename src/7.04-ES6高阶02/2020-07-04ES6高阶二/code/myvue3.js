class Vue {
  constructor(options) {
    this.deps = {} // 依赖收集器对象
    this.$options = options;
    this._data = options.data; // 接收数据属性
    this._data = this.observer(this._data); // 给data属性设置拦截器
    this.compile();
  }
  observer(data) {
    const deps = this.deps
    const target = data;
    const handler = {
      get: function (target, key) {
        console.log("proxy get...");
        if (target[key]) {
          if (!deps[key]) { // 当访问data中的一个属性key的时候, 如果这个key没有对应的dep, 则新建一个名为key的dep
            deps[key] = new Dep();
          } else {
            // 如果 Dep.target 不为null,说明此时该key有了一个watcher,那么就把这个watcher添加到这个key的dep中
            Dep.target && deps[key].addSub(Dep.target)
          }
          return target[key];
        }
        return Reflect(target, key)
      },
      set: function (target, key, newValue) {
        console.log("proxy set...");
        const dep = deps[key]
        // 当data中的属性key被修改时,就拿到这个key的dep,然后通知dep中所有的watcher,并把修改后的值作为参数传递
        dep && dep.notify(newValue);
        return Reflect.set(target, key, newValue)
      },
    };
    return new Proxy(target, handler);
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
            // 当data中的一个属性在dom中被匹配到之后, 说明该处使用了这个属性, 所以就在此时给该属性创建一个watcher(订阅者)
            // 当这个属性的值在其他地方被修改时, 就会触发这个属性所有的watcher的update方法, 将所有用到这个属性的地方的该属性值进行修改
            // 实例化watcher --> 重新编译模板
            new Watcher(this._data, attrValue, (newValue) => {
              node.value = newValue
            });
            node.addEventListener("input", (e) => {
              console.log(e.target.value);
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
            node.textContent = ""; // 渲染为空
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
              console.log($1, newValue, oldValue);
              let reg = new RegExp(oldValue);
              node.textContent = node.textContent.replace(reg, newValue);
            }); // 当你在此处使用了data中的某个属性key,如果需要此处key的值可以随其他地方的改变而动态修改
                // 那么就可以在此处给这个key创建一个watcher,watcher的回调函数就是修改此处key的值
                // 然后当其他地方key的值改变后,就会调用watcher的回调,将此处的key值也做相应修改
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
  // 发布；通知一个key对应的所有watcher
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
  // 触发每个watcher的回调函数, 将新值作为参数传递, 回调函数的作用就是将此处用到的key的值修改为新值
  update(newValue) {
    console.log("update...", newValue);
    this.cb(newValue);
  }
}
