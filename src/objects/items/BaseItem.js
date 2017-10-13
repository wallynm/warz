import Phaser from "phaser";

export default class extends Phaser.Sprite {
  constructor({ x, y, name, layer, type }) {
    super(game, x, y, name);
    console.info(this)
    // this.type = type;
    // this.name = name;
    this.layer = layer;
  }
}