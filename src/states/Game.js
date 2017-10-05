/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Player from '../sprites/Player'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
      game.stage.backgroundColor = '#000000';
    
      const bg = game.add.tileSprite(0, 0, 800, 600, 'background');
      bg.fixedToCamera = true;
  
      const map = game.add.tilemap('level1');
      map.addTilesetImage('tiles-1');
      map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);
  
      const layer = map.createLayer('Tile Layer 1');
      layer.resizeWorld();

      //  Un-comment this on to see the collision tiles
      layer.debug = true;
  
      // layer.resizeWorld();
  
      game.physics.arcade.gravity.y = 550;

    const bannerText = 'Stick Wars Fck Yeah'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    this.player = new Player({
      layer,
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'dude'
    })

    this.game.add.existing(this.player)
  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.mushroom, 32, 32)
    // }
  }
}
