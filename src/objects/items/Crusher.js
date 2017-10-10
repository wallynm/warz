import Phaser from "phaser"
import FireWeapon from "./FireWeapon"

export default class extends FireWeapon {
  constructor({ bullets, layer, x, y }) {
    super({ bullets, layer, x, y, name: 'crusher'});
  }
  get fireDelay() {
    return 1000;
  }

  get equipedPosY(){
    return 10;
  }

  get equipedPosX(){
    return 0;
  }
}