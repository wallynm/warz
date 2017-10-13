/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../objects/characters/Mushroom'
import Player from '../objects/characters/Jack'

import Crusher from '../objects/items/weapon/ranged/Crusher'

export default class extends Phaser.State {
  init () {}
  preload () {}
  
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // game.stage.backgroundColor = '#FFF';
    
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
    
    const banner = this.add.text(this.world.centerX, this.game.height - 80, 'Stick Wars Fck Yeah')
    banner.font = 'Bangers';
    banner.padding.set(10, 16);
    banner.fontSize = 40;
    banner.fill = 'green';
    banner.smoothed = true;
    banner.anchor.setTo(0.5);
    banner.fixedToCamera = true;
    let life = '';
    life = this.add.text(this.world.centerX, this.game.height - 80, 100)
    life.font = 'Bangers';
    life.padding.set(10, 16);
    life.fontSize = 16;
    life.fill = 'red';
    life.smoothed = true;
    life.anchor.setTo(0.5);
    life.fixedToCamera = true;
    life.x = 50
    life.y = 50

    let bullets = this.add.text(this.world.centerX, this.game.height - 40, 0)
    bullets.font = 'Bangers';
    bullets.padding.set(10, 16);
    bullets.fontSize = 16;
    bullets.fill = 'red';
    bullets.smoothed = true;
    bullets.anchor.setTo(0.5);
    bullets.fixedToCamera = true;
    bullets.x = 100    
    bullets.y = 100    

    game.global = {};
    game.global.ui = {
      labels: {
        life, bullets, banner
      }
    }

    const items = game.add.group();
    items.enableBody = true;
    items.physicsBodyType = Phaser.Physics.ARCADE;
    game.physics.enable(items, Phaser.Physics.ARCADE);

    const players = game.add.group();
    // players.enableBody = true;
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

    items.addMultiple([baseWeapon1, baseWeapon2, baseWeapon3]);
    // items.addChild(baseWeapon2);
    // items.addChild(baseWeapon3);
    
    players.addChild(new Player({
      inventory: [baseWeapon1],
      layer,
      x: this.world.centerX,
      y: this.world.centerY,
    }));

    game.global.items = items;
    game.global.players = players;
    game.global.sound = false;
  }

  update(){
  
    game.physics.arcade.collide(game.global.players, game.global.items, this.itemCollision, null, this);
  }

  itemCollision(player, item){
    // console.info(player, item)
    game.global.items.removeChild(item);
    player.inventory = item;
    // item.kill();
    // console.info('what?', item, player);
  }

  render(){
    game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");    
  }
}
