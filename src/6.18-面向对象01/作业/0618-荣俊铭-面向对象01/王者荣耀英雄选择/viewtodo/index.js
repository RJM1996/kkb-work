// 组织逻辑

//  英雄对象；  技能  ； 皮肤； 玩家对象；
// 亚瑟  鲁班  王昭君  -->  继承 Hero(基类)

import Game from "./game/game.js";
let game = new Game();

// 节点获取；

let eles = {
  login: {
    loginBtn: document.querySelector(".sub"),
    username: document.querySelector(".username"),
    loginView: document.querySelector(".login"),
  },
  game: {
    gameView: document.querySelector(".game"),
    heroView: document.querySelector(".heroView"),
    chioseusername: document.querySelector(".chioseusername"),
    heroShow: document.querySelector(".heroShow"),
    skillsView: document.querySelector(".skillsView"),
    // 获取皮肤展示节点
    skinsView: document.querySelector(".skinShow"),
  },
};
eles.login.loginBtn.onclick = function () {
  let username = eles.login.username.value;
  if (username) {
    // 登录；
    // console.log(username)
    game.login(username);
    console.log(game);
    // 隐藏登录页面
    eles.login.loginView.style.display = "none";
    // 显示游戏页面
    eles.game.gameView.style.display = "block";
    // 修改玩家名称；
    eles.game.chioseusername.innerHTML = username;
    // 渲染英雄；
    renderHero();
  }
};

function renderHero() {
  let heros = game.player.heros;
  eles.game.heroView.innerHTML = "";
  eles.game.skinsView.innerHTML = "";

  heros.forEach((hero) => {
    // 创建节点
    let heroItem = document.createElement("div");
    heroItem.classList.add("heroItem");
    heroItem.innerHTML = ` <img src="${hero.ico}" />
        <span>${hero.name}</span>`;
    heroItem.onclick = function () {
      let img = new Image();
      img.src = hero.ico;
      //修改选中图标
      eles.game.heroShow.innerHTML = "";
      eles.game.heroShow.appendChild(img);
      console.log("渲染技能, 皮肤", hero);
      renderSkills(hero);
      renderSkins(hero);
    };
    eles.game.heroView.appendChild(heroItem);
  });
}

function renderSkills(hero) {
  // 渲染dom
  let skills = hero.skills;
  eles.game.skillsView.innerHTML = "";
  skills.forEach((skill) => {
    let img = new Image();
    img.src = skill.ico;
    img.title = skill.name
    eles.game.skillsView.appendChild(img);
  });
}

// 渲染皮肤
function renderSkins(hero) {
  let skins = hero.skins;
  eles.game.skinsView.innerHTML = "";
  let img = new Image();
  img.src = skins[0].ico; // 渲染默认皮肤
  eles.game.skinsView.appendChild(img);
}
