/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../objects/characters/Mushroom'
import Player from '../objects/characters/Jack'

import Crusher from '../objects/items/Crusher'

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
    // layer.debug = true;
    
    // layer.resizeWorld();
    
    game.physics.arcade.gravity.y = 550;
    
    const bannerText = 'Stick Wars Fck Yeah'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    banner.font = 'Bangers';
    banner.padding.set(10, 16);
    banner.fontSize = 40;
    banner.fill = '#77BFA3';
    banner.smoothed = false;
    banner.anchor.setTo(0.5);

    const items = game.add.group();
    items.enableBody = true;
    items.physicsBodyType = Phaser.Physics.ARCADE;
    game.physics.enable(items, Phaser.Physics.ARCADE);

    const players = game.add.group();
    players.enableBody = true;
    players.physicsBodyType = Phaser.Physics.ARCADE;
    game.physics.enable(players, Phaser.Physics.ARCADE);
    
    const baseWeapon1 = new Crusher({
      layer,      
      bullets: 1
    });

    const baseWeapon2 = new Crusher({
      layer,      
      bullets: 1,
      x: this.world.centerX + 200,
      y: this.world.centerY,
    });

    const baseWeapon3 = new Crusher({
      layer,      
      bullets: 1,
      x: this.world.centerX + 400,
      y: this.world.centerY + 200,
    });

    items.addChild(baseWeapon2);
    items.addChild(baseWeapon3);
    
    players.addChild(new Player({
      items: [baseWeapon1],
      layer,
      x: this.world.centerX,
      y: this.world.centerY,
    }));

    game.global = {
      items,
      players,
      sound: false
    }
  }

  update(){
  
    game.physics.arcade.collide(game.global.players, game.global.items, this.itemCollision, null, this);
  }

  itemCollision(player, item){
    console.info(player, item)
    player.equipNewItem(item);
    // item.kill();
    // console.info('what?', item, player);
  }

  render(){
    game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");    
  }
}
