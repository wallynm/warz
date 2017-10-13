import Phaser from "phaser";
import isEmpty from 'lodash/isEmpty';

const PLAYER_VELOCITY = 150;
const BACKWARDS_REDUCER = 0.5;

export default class extends Phaser.Sprite {
  _inventory = [];
  _equipedWeapon = null;

  constructor({ x, y, layer, inventory }) {
    super(game, x, y, "jack");

    this.inventory = inventory;
    this.layer = layer;
    this.anchor.setTo(0.5);
    this.facing = 'left';
    this.jumpTimer = 0;

    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.camera.follow(this);

    this.body.bounce.y = 0.2;
    this.body.collideWorldBounds = true;
    this.body.setSize(20, 32, 5, 16);

    this.animations.add("left", [0, 1, 2, 3], 10, true);
    this.animations.add("turn", [4], 20, true);
    this.animations.add("right", [5, 6, 7, 8], 10, true);

    this.cursors = game.input.keyboard.createCursorKeys();
    this.commands = {
      jump: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D),
      left: game.input.keyboard.addKey(Phaser.Keyboard.A),
      down: game.input.keyboard.addKey(Phaser.Keyboard.S)
    }
  }

  equipWeapon(item){
    const weapon = this.getItemIventoryByName(item.data.name);
    if(!weapon){
      this._inventory.push(item);    
      item.equip();
      this.addChild(item);
      this._equipedWeapon = this.inventory.indexOf(item);
    } else {
      console.info(weapon)
      weapon.bullets.resetShots();
      item.kill();
    }
  }

  get inventory(){
    return this._inventory;
  }

  set inventory(data){
    if(isEmpty(data))
      return;
    
    data = (data.length) ? data : [data];
    data.map((item) => {
      if(item.data.type === 'weapon'){
        this.equipWeapon(item);
      }
    });
  }
  // updateIventory() {
  //   if(this.inventory.length){
  //     this.inventory.map((item) => this.addIventoryItem(item));
  //   }
  // }

  getItemIventoryByName(name){
    return this.inventory.filter(item => item.data.name === name)[0];
  }

  update() {    
    game.physics.arcade.collide(this, this.layer);
    let velocityMultiplier = 1;
    const weapon = (this._equipedWeapon === null) ? null : this.inventory[this._equipedWeapon];
    const rotation = game.physics.arcade.angleToPointer(this);
    const mouseFacingLeft = (rotation <= 1.5 && rotation >= -1.5);

    // alert(weapon)

    if(mouseFacingLeft){
      this.animations.play("right");
      this.facing = "right";
    } else {
      this.animations.play("left");
      this.facing = "left";
    }

    if (this.commands.left.isDown) {
      if(mouseFacingLeft){
        this.animations.currentAnim.speed = 6        
        velocityMultiplier = BACKWARDS_REDUCER;
      }
      this.body.velocity.x = (-PLAYER_VELOCITY) * velocityMultiplier;
    } else if (this.commands.right.isDown ) {
      if(!mouseFacingLeft){
        this.animations.currentAnim.speed = 6        
        velocityMultiplier = BACKWARDS_REDUCER;
      }
      this.body.velocity.x = (PLAYER_VELOCITY) * velocityMultiplier;
    } else {
      this.frame = (mouseFacingLeft) ? 5 : 0;
      this.body.velocity.x = 0;
    }
    
    if(weapon){
      game.input.activePointer.isDown && weapon.fire();
      weapon.rotate(this.facing, rotation);
      weapon.update();      
    }

    if (
      this.commands.jump.isDown &&
      (this.body.onFloor()) &&
      // (this.body.onFloor() || this.body.onWall() ) &&
      game.time.now > this.jumpTimer
    ) {
      this.body.velocity.y = -250;
      this.jumpTimer = game.time.now + 750;
    }
  }
}
