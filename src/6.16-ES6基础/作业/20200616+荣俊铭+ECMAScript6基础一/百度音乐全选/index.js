{
  let data = [
    {
      id: 1,
      title: "残酷月光 - 费启鸣",
      checked: true,
      collect: true,
    },
    {
      id: 2,
      title: "兄弟 - 艾热",
      checked: true,
      collect: false,
    },
    {
      id: 3,
      title: "毕生 - 夏增祥",
      checked: true,
      collect: true,
    },
    {
      id: 4,
      title: "公子向北去 - 李春花",
      checked: false,
      collect: false,
    },
    {
      id: 5,
      title: "战场 - 沙漠五子",
      checked: true,
      collect: false, //是否收藏 true 收藏 false 没有收藏
    },
  ];

  // 渲染视图
  function render(data) {
    document.querySelector("#list").innerHTML = "";
    data.forEach((item) => {
      let liEle = document.createElement("li");
      liEle.innerHTML = `<input type="checkbox" ${
        item.checked ? "checked" : ""
      } />
        <span>${item.title}</span>
        ${
          item.collect
            ? '<a href="javascript:;" class="cancelCollect">取消收藏</a>'
            : '<a href="javascript:;" class="collect">收藏</a>'
        }
        <a href="javascript:;" class="remove">删除</a>`;
      document.querySelector("#list").appendChild(liEle);
    });

    // 判断是否全选；(判断数据)
    let isCheckedAll = data.every((item) => item.checked);
    document.querySelector("#checkAll").checked = isCheckedAll;
    addEvent();
  }

  render(data);

  function addEvent() {
    // 实现功能；
    let lis = document.querySelectorAll("li");

    lis.forEach((li, key) => {
      // 收藏功能；
      // 获取收藏按钮；
      let collectionBtn = li.querySelector(".collect");
      // 有收藏按钮 --》事件绑定
      collectionBtn &&
        (collectionBtn.onclick = function () {
          // 改变数据；
          data[key].collect = true;
          // 渲染视图
          render(data);
        });

      // 取消收藏；
      let cancelCollectionBtn = li.querySelector(".cancelCollect");
      cancelCollectionBtn &&
        (cancelCollectionBtn.onclick = function () {
          data[key].collect = false;
          render(data);
        });

      // 删除；
      let delBtn = li.querySelector(".remove");
      delBtn.onclick = function () {
        data.splice(key, 1);
        render(data);
      };

      // 选中状态；
      let checkEle = li.querySelector("input");
      checkEle.onclick = function () {
        // 改变数据
        data[key].checked = this.checked;
        // 判断是否全选；
        render(data);
      };
    });
  }

  // 点全选；
  document.querySelector("#checkAll").onclick = function () {
    data.forEach((item) => {
      item.checked = this.checked;
    });
    render(data);
  };

  // 点击删除选中状态；
  document.querySelector("#remove").onclick = function () {
    // 处理数据；
    let res = data.filter((item) => !item.checked);
    data = res;
    render(res);
  };

  // 作业：实现音乐的添加功能；
  document.querySelector("#add").onclick = () => {
    let newInfo = document.querySelector("#newInfo");
    let title = newInfo.value.trim();
    let flag = data.some((item) => {
      return item.title === title;
    });
    if (title === "") {
      alert("输入为空");
    } else if (flag) {
      alert("已经有这首歌曲啦");
    } else {
      let newItem = {
        id: data.length + 1,
        title: title,
        checked: false,
        collect: false,
      };
      data.push(newItem);
      render(data);
    }
    newInfo.value = "";
    console.log(data);
  };
}
