import Phaser from "phaser"
import FireWeapon from "./FireWeapon"

export default class extends FireWeapon {
  constructor({ bullets, layer, x, y }) {
    super({ bullets, layer, x, y, name: 'crusher'});
  }
}