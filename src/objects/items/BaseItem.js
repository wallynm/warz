import Phaser from "phaser";

export default class extends Phaser.Sprite {
  constructor({ x, y, name, layer }) {
    super(game, x, y, name);
    this.layer = layer;
  }
}