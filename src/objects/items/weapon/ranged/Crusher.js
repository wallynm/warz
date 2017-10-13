import Phaser from "phaser"
import RangedWeapon from "./RangedWeapon"

export default class extends RangedWeapon {
  constructor(options) {
    console.info()
    super({name: 'crusher', ...options});
    this.fireDelay = 1000;
    this.equipedPosY = 10;
    this.equipedPosX = 3;

    // this.bullets.addBulletAnimation('crusher-shoot', null, 30, false, false);
    // this.bullets.bulletAnimation = 'crusher-shoot';

    this.bullets.bulletSpeed = 800;
    // this.bullets.enableBody = false;
    
    this.bullets.bulletKillType = Phaser.Weapon.KILL_LIFESPAN
    this.bullets.bulletLifespan = 540;
    this.bullets.bulletGravity.y = -450;
    // this.bullets.bulletAngleOffset = 0; 
    this.bullets.trackOffset.x = 30;   
    this.bullets.trackOffset.y = 2;
    this.bullets.fireLimit = 12;
    this.bullets.fireRate = 60;
    // this.bullets.bulletAngleVariance = 30;
  }
  
  hitFloor(bullet, floor) {
    bullet.kill();
  }

  fire(){
    if (game.time.now >= this.nextFire) {
      this.nextFire = game.time.now + this.fireDelay;
      // this.bullets.fireMany([1, 100, 200, 300]);
      this.bullets.fire();
    }
  }
}