import Phaser from "phaser";

export default class extends Phaser.Sprite {
  constructor({ x, y, layer, items }) {
    super(game, x, y, "jack");
    this.items = items;
    this.layer = layer;
    this.anchor.setTo(0.5);
    this.cursors = game.input.keyboard.createCursorKeys();
    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.facing = 'left';
    this.jumpTimer = 0;
    this.equipedWeapon = null;

    this.addItems();

    // console.info('omg', this)

    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.camera.follow(this);

    // this.game.add.sprite(32, 32, 'dude');

    this.body.bounce.y = 0.2;
    this.body.collideWorldBounds = true;
    this.body.setSize(20, 32, 5, 16);

    this.animations.add("left", [0, 1, 2, 3], 10, true);
    this.animations.add("turn", [4], 20, true);
    this.animations.add("right", [5, 6, 7, 8], 10, true);
    this.game.add.existing(this)    
  }

  addItems() {
    this.items.forEach((item) => {
      item.anchor.setTo(0.2)
      this.addChild(item);
      item.x = 0;
      this.equipedWeapon = this.items.indexOf(item);
    });
  }

  update() {
    game.physics.arcade.collide(this, this.layer);
    const weapon = this.items[this.equipedWeapon];
    const rotation = game.physics.arcade.angleToPointer(this);

    if (this.equipedWeapon !== null) {
      if (game.input.activePointer.isDown) {
        weapon.fire();
      }    
    }


    
    game.physics.arcade.collide(this, this.layer);
    this.body.velocity.x = 0;

    if (this.cursors.left.isDown) {
      this.body.velocity.x = -150;

      if (this.facing != "left") {
        this.animations.play("left");
        this.facing = "left";
      }
    } else if (this.cursors.right.isDown) {
      this.body.velocity.x = 150;

      if (this.facing != "right") {
        this.animations.play("right");
        this.facing = "right";
      }
    } else {
      // if (this.facing != "idle") {
        this.animations.stop();

        if (this.facing == "left") {
          this.frame = 0;
        } else {
          this.frame = 5;
        }

        // this.facing = "idle";
      // }
    }

    if(weapon) {
      weapon.rotate(this.facing, rotation);
    }

    if (
      this.jumpButton.isDown &&
      this.body.onFloor() &&
      game.time.now > this.jumpTimer
    ) {
      this.body.velocity.y = -250;
      this.jumpTimer = game.time.now + 750;
    }
  }
}
