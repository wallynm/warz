import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    game.load.tilemap('level1', './assets/map/level1.json', null, Phaser.Tilemap.TILED_JSON)
    game.load.image('tiles-1', './assets/images/tiles-1.png')
    
    game.load.image('crusher', './assets/images/crusher.png')
    game.load.image('crusher-bullet', './assets/images/crusher-bullet.png')


    game.load.spritesheet('jack', './assets/images/jack.png', 32, 48)
    game.load.spritesheet('droid', './assets/images/droid.png', 32, 32)
    game.load.image('starSmall', './assets/images/star.png')
    game.load.image('starBig', './assets/images/star2.png')
    game.load.image('background', './assets/images/background2.png')
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
