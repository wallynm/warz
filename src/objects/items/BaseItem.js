import Phaser from "phaser";

export default class extends Phaser.Sprite {
  constructor({ x, y, name, layer, type }) {
    super(game, x, y, name);
    this.data = { ...this.data, type, layer, name }
  }
}