import Phaser from 'phaser';
import BaseItem  from '../../BaseItem';

export default class extends BaseItem {
  constructor(options) {
    super({type: 'weapon', ...options});
    
    this.fireDelay = 0;    
    this.nextFire = 0;
    this.equipedPosX = 0;
    this.equipedPosY = 0;
    this.bullets = game.add.weapon(options.bullets, `${options.name}-bullet`);

    this.bullets.trackSprite(this, 0, 0, true);
    this.bullets.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.bullets.bulletAngleOffset = 90;
    this.bullets.bulletSpeed = 800;

    this._bulletsRemaining = this.bullets.fireLimit;
    
    
    // this.body.bounce.y = 0.2;
    // this.body.collideWorldBounds = true;
    // this.body.setSize(20, 32, 5, 16);    
    // this.game.add.existing(this);

  }

  update(){
    game.physics.arcade.collide(this, this.data.layer);
    game.physics.arcade.collide(this.bullets.bullets, this.data.layer, this.hitFloor, null, this);
  }

  equip(){
    this.y = this.equipedPosY;
    this.x = this.equipedPosX;
    this.body.bounce.y = 0;    
    this.body.moves = false;
    this.body.enable = false;
    this.body.moves = false;
    game.global.ui.labels.bullets.text = this.bullets.fireLimit;
  }

  fire() {
    if (game.time.now >= this.nextFire) {
      this.nextFire = game.time.now + this.fireDelay;
      this.bullets.fire();
      this._bulletsRemaining = this._bulletsRemaining - 1;
      console.info(this.bullets.shots, this.bullets)
      game.global.ui.labels.bullets.text = this._bulletsRemaining;
    }
  }

  hitFloor(bullet, floor) {
    bullet.kill();
  }

  rotate(orientation, rotation) {
    let val = 1;
    if(orientation === 'left'){
      val = -1
    }

    const degrees = Phaser.Math.radToDeg(rotation * val);
    // console.info(degrees)
    const degreesRight = (degrees > -50 && degrees < 50);
    const degreesLeft = ((degrees < -100 && degrees> 180 ) || (degrees > 120 && degrees < 180));

    
    // if(degreesRight || degreesLeft){
      this.rotation = rotation;
    // }

    if(orientation === 'right'){
      this.scale.x = val;
      this.scale.y = val;
      // this.rotation = Phaser.Math.reverseAngle(this.rotation);
    } else {
      this.scale.y = val;
      this.scale.x = -val;
      // this.rotation = Phaser.Math.reverseAngle(this.rotation);
    }

    // this.anchor.setTo(.5, 1); 
    //so it flips around its middle 
    
    // this.scale.x = 1; 
    //facing default direction 
    
    // this.scale.x = -1; //flipped
    
    
    // // || (degrees > -50 && degrees < 50 && orientation === 'left'))
    // {
    // }


  }
}









// var sprite;
// var weapon;
// var cursors;
// var fireButton;

// function create() {

//     //  Creates 1 single bullet, using the 'bullet' graphic
//     weapon = game.add.weapon(1, 'bullet');

//     //  The bullet will be automatically killed when it leaves the world bounds
//     weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

//     //  Because our bullet is drawn facing up, we need to offset its rotation:
//     weapon.bulletAngleOffset = 90;

//     //  The speed at which the bullet is fired
//     weapon.bulletSpeed = 400;

//     sprite = this.add.sprite(320, 500, 'ship');

//     game.physics.arcade.enable(sprite);

//     //  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
//     weapon.trackSprite(sprite, 14, 0);

//     cursors = this.input.keyboard.createCursorKeys();

//     fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

// }

// function update() {
  

//     // sprite.body.velocity.x = 0;

//     // if (cursors.left.isDown)
//     // {
//     //     sprite.body.velocity.x = -200;
//     // }
//     // else if (cursors.right.isDown)
//     // {
//     //     sprite.body.velocity.x = 200;
//     // }

//     // if (fireButton.isDown)
//     // {
//     //     weapon.fire();
//     // }

// }
