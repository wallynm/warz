import Phaser from "phaser"
import RangedWeapon from "./RangedWeapon"

export default class extends RangedWeapon {
  constructor(options) {
    super({name: 'crusher', ...options});

    this.fireDelay = 0;
    this.equipedPosY = 15;
    this.equipedPosX = 0;
    this.anchor.set(.1, .5);    
    
    // this.bullets.addBulletAnimation('crusher-shoot', null, 30, false, false);
    // this.bullets.bulletAnimation = 'crusher-shoot';

    this.bullets.bulletSpeed = 1000;
    // this.bullets.enableBody = false;
    
    this.bullets.bulletKillType = Phaser.Weapon.KILL_LIFESPAN
    this.bullets.bulletLifespan = 54000;
    this.bullets.bulletGravity.y = -550;
    // this.bullets.bulletAngleOffset = 0; 
    this.bullets.trackOffset.x = 40;   
    this.bullets.trackOffset.y = -2;
    this.bullets.fireLimit = 12;
    this.bullets.fireRate = 1;
    // this.bullets.bulletAngleVariance = 30;
  }
  
  // fire(){
  //   // if (game.time.now >= this.nextFire) {
  //     // this.nextFire = game.time.now + this.fireDelay;
  //     // this.bullets.fireMany([1, 100, 200, 300]);
  //     this.bullets.fire();
  //   // }
  // }
}