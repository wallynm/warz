// weapon = function(posx,posy,speed,frequency,angular){


// 	this.posx=posx
// 	this.posy=posy
// 	this.flag_explode=false
// 	this.speed=speed
// 	this.angular=angular
// 	this.frequency=frequency

// 	//canon
// 	Phaser.Sprite.call(this,game,this.posx,this.posy,'canon')
// 	this.anchor.setTo(.5,.5)
// 	this.angle=this.angular
// 	game.physics.arcade.enable(this);
// 	this.weapon=game.add.weapon(9,'bullet')	
// 	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
// 	//  Because our bullet is drawn facing up, we need to offset its rotation:
// 	this.weapon.bulletAngleOffset = 0;

// 	//  The speed at which the bullet is fired
// 	this.weapon.bulletSpeed = this.speed;

// 	//  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
// 	this.weapon.fireRate = this.frequency ;

// 	//  Add a variance to the bullet angle by +- this value
// 	this.weapon.bulletAngleVariance = 0;

// 	//  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
// 	this.weapon.trackSprite(this,0,0,true);
// }



import Phaser from "phaser";

export default class extends Phaser.Sprite {
  get type(){
    return 'weapon'
  }
  get killType(){
    return Phaser.Weapon.KILL_WORLD_BOUNDS;
  }

  constructor({ bullets, x, y, name, layer }) {
    super(game, 15, 15, name);
    
    this.layer = layer;
    this.layer = layer;
    this.bullets = game.add.weapon(bullets, `${name}-bullet`);
    this.nextFire;

    // this.anchor.set(0.2);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    
    this.bullets.trackSprite(this);
    this.bullets.bulletKillType = this.killType;
    this.bullets.bulletAngleOffset = 90;
    this.bullets.bulletSpeed = 400;

    
    
    // this.body.bounce.y = 0.2;
    // this.body.collideWorldBounds = true;
    this.body.moves = false    
    
  }


  // update() {
  //   game.physics.arcade.collide(this, this.layer);
    
  //   const rotation = game.physics.arcade.angleToPointer(this);
  //   const degrees = rotation * (180/Math.PI);

  //   if(degrees > 120 || degrees < -120){
  //     // this.scale.x = this.scale.x * -1
  //     this.rotation = rotation;      
  //   }

  //   // console.info(this.rotation)

  //   if (game.input.activePointer.isDown) {
  //     // this.fire();
  //   }    
  // }
  
  fire() {
    if (game.time.now > this.nextFire && bullets.countDead() > 0) {
      this.nextFire = game.time.now + fireRate;
      var bullet = bullets.getFirstDead();
      
      bullet.reset(sprite.x - 8, sprite.y - 8);
      
      game.physics.arcade.moveToPointer(bullet, 300);
    }
  }

  rotate(orientation, rotation) {
    let val = 1;
    if(orientation === 'left'){
      val = -1
    }
    const degrees = ((rotation) * (180/Math.PI)) * val;
    
    console.info(orientation, rotation)
    if(degrees > -50 && degrees < 50 && orientation === 'right'){
      this.rotation = rotation;      
    }
    if(degrees < -120 && degrees < 120 && orientation === 'left'){
      this.rotation = rotation;
    }

    // this.anchor.setTo(.5, 1); 
    //so it flips around its middle 
    
    // this.scale.x = 1; 
    //facing default direction 
    
    // this.scale.x = -1; //flipped
    
    
    // // || (degrees > -50 && degrees < 50 && orientation === 'left'))
    // {
    // }

    this.scale.x = val;

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
