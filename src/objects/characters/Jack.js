import Phaser from "phaser";

const PLAYER_VELOCITY = 150;
const BACK_VELOCITY_APPLIER = 0.5;

export default class extends Phaser.Sprite {
  constructor({ x, y, layer, items }) {
    super(game, x, y, "jack");
    this.inventory = items || [];
    this.layer = layer;
    this.anchor.setTo(0.5);
    this.cursors = game.input.keyboard.createCursorKeys();
    this.commands = {
      jump: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D),
      left: game.input.keyboard.addKey(Phaser.Keyboard.A),
      down: game.input.keyboard.addKey(Phaser.Keyboard.S)
    }
    this.facing = 'left';
    this.jumpTimer = 0;
    this.equipedWeapon = null;

    this.equipUserItems();


    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.camera.follow(this);

    // this.game.add.sprite(32, 32, 'dude');

    this.body.bounce.y = 0.2;
    this.body.collideWorldBounds = true;
    this.body.setSize(20, 32, 5, 16);

    this.animations.add("left", [0, 1, 2, 3], 10, true);
    this.animations.add("turn", [4], 20, true);
    this.animations.add("right", [5, 6, 7, 8], 10, true);
    // this.game.add.existing(this)
  }

  addIventoryItem(item) {
    this.inventory.push(item);
    console.info(item)
    item.equip();
    this.addChild(item);
    this.equipedWeapon = this.inventory.indexOf(item);

    if(item === 'weapon'){
      this.equipWeapon(item);
    }
  }

  equipUserItems() {
    if(this.inventory){
      this.inventory.forEach((item) => this.addIventoryItem(item));
    }
  }

  update() {    
    game.physics.arcade.collide(this, this.layer);
    let velocityMultiplier = 1;

    const weapon = (this.equipedWeapon === null) ? null : this.inventory[this.equipedWeapon];
    const rotation = game.physics.arcade.angleToPointer(this);
    const mouseFacingLeft = (rotation <= 1.5 && rotation >= -1.5);

    if(mouseFacingLeft){
      // this.frame = 5;
      this.animations.play("right");
      this.facing = "right";
    } else {
      // this.frame = 0;
      this.animations.play("left");
      this.facing = "left";
    }

    if (this.commands.left.isDown) {
      if(mouseFacingLeft){
        this.animations.currentAnim.speed = 6        
        velocityMultiplier = BACK_VELOCITY_APPLIER;
      }
      this.body.velocity.x = (-PLAYER_VELOCITY) * velocityMultiplier;
    } else if (this.commands.right.isDown ) {
      if(!mouseFacingLeft){
        this.animations.currentAnim.speed = 6        
        velocityMultiplier = BACK_VELOCITY_APPLIER;
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
