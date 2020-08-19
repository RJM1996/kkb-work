import Player from "./player.js";
// 游戏管理类
class Game {
  constructor() {
    this.player = "";
  }
  login(name) {
    // 登录；-->实例化玩家
    this.player = new Player(name);
    console.log(this.player.heros);
    this.player.heros.forEach((item) => {
      item.trigger("heroInit", item.name);
    });
  }
}

let instace;
// 工厂模式;
export default function (...arg) {
  if (instace) {
    return instace;
  }
  instace = new Game(...arg);
  return instace;
}
