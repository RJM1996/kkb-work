class KPromise {
  constructor(handle) {
    this.status = "pending";
    this.value = undefined;
    this.resolvedQueue = [];
    this.rejectedQueue = [];
    handle(this._resolve.bind(this), this._reject.bind(this));
  }
  _resolve(val) {
    // console.log(this);
    // 改变状态及value
    this.status = "resolved";
    this.value = val;
    // console.log(val);
    // 执行then里成功成功的回调
    // console.log(this.resolvedQueue.length);
    let run = () => {
      let cb;
      while ((cb = this.resolvedQueue.shift())) {
        cb(val);
      }
    };
    // 模拟微任务
    let observer = new MutationObserver(run);
    observer.observe(document.body, {
      attributes: true,
    });
    document.body.setAttribute("kkb", Math.random());
  }
  _reject(err) {
    this.status = "rejected";
    this.value = err;
    // console.log(err);
    // 执行then里失败的回调；
    let run = () => {
      let cb;
      while ((cb = this.rejectedQueue.shift())) {
        cb(err);
      }
    };
    // 模拟微任务
    let observer = new MutationObserver(run);
    observer.observe(document.body, {
      attributes: true,
    });
    document.body.setAttribute("kkb", Math.random());
  }
  then(onResolved, onRejected) {
    // 返还KPromise对象；实现链式调用
    return new KPromise((resolve, reject) => {
      // 在then里执行的回调
      this.resolvedQueue.push((val) => {
        val = onResolved && onResolved(val);
        if (val instanceof KPromise) {
          return val.then(resolve);
        }
        // 返还的普通值；
        resolve(val);
      });

      this.rejectedQueue.push((err) => {
        onRejected && onRejected(err);
        reject(err);
      });
    });
  }

  static resolve(val) {
    return new KPromise((resolve) => {
      resolve(val);
    });
  }
  static reject(val) {
    return new KPromise((resolve, reject) => {
      reject(val);
    });
  }
  static all(lists) {
    return new KPromise((resolve, reject) => {
      let arr = [];
      let flag = false;
      for (let i = 0; i < lists.length; i++) {
        lists[i].then(
          (res) => {
            arr.push(res);
          },
          (err) => {
            flag = true;
            arr = [];
            arr.push(err);
            reject(err);
            // throw Error("error..");
          }
        );
      }
      if (flag) reject(arr);
      else resolve(arr);
    });
  }

  static race(lists) {
    return new KPromise((resolve, reject) => {
      for (let i = 0; i < lists.length; i++) {
        lists[i].then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  // 作业：实现 promise 的 finally 方法
  finally(cb) {
    return this.then(
      (res) => {
        return KPromise.resolve(cb()).then(() => {
          return res;
        });
      },
      (err) => {
        return KPromise.resolve(cb()).then(() => {
          return err
        });
      }
    );
  }
}
