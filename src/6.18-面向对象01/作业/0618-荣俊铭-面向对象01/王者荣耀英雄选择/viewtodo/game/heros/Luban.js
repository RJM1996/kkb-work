import { S11210, S11220, S11230 } from "../skills/luban/skiils.js";
import { Skin301120, Skin301121, Skin301122 } from "../skins/luban/skins.js";

export default class Luban {
  constructor() {
    this.name = "鲁班";
    // 技能
    this.skills = [new S11210(), new S11220(), new S11230()];
    // 皮肤
    this.skins = [new Skin301120(), new Skin301121(), new Skin301122()];
    this.ico = "./sources/heros/luban1.png";
  }
}
