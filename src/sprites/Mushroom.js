import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'mushroom')
    console.info(this)
    
    this.anchor.setTo(0.5)
  }

  update () {
    this.angle += 1
  }
}
