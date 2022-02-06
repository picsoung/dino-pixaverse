import { updateScore, showHighScore, setHighScore } from "../ui/score";
import { showGameOver } from "../ui/gameState";

import { connect } from "react-redux";
import store, { UPDATE_SCORE, UPDATE_HIGHSCORE } from "../../../store";

class Player extends Phaser.GameObjects.Container{
  constructor(scene, x, y, hat, avatar) {
    // this.scene = scene;
    super(scene)

    if(!avatar){
        this.sprite = scene.physics.add
        .sprite(x, y, "atlas")
        .setScale(2)
        .setImmovable()
        .setCollideWorldBounds();
    }

    if(hat){
        scene.load.image('hat', 'https://i.imgur.com/UoDdKKS.png');
        scene.load.start();
        scene.load.on("complete", () => {
            this.hat = scene.add.sprite(20,20, 'hat').setScale(.05);
        });
    }
    
    if(avatar){
        this.avatar = true
        scene.load.image('avatar', avatar);
        scene.load.start(); 
        scene.load.on("complete", () => {
            this.sprite = scene.physics.add.sprite(x,y, 'avatar').setScale(.05)
            .setImmovable()
            .setCollideWorldBounds();
        });
    }

    this.weapon = scene.add.sprite(0, 0, 'axe')
    // this.weapon.setOrigin(0.5);
  
    this.isDead = false;
    this.timer = 0;
    // return this;
    scene.add.existing(this)
  }

  update(input, delta) {
    this.timer += delta;
    if (!this.isDead && this.sprite.body.onFloor()) { 
        if(!this.avatar){
            this.sprite.play("run", true);
        }
    }

    if (input.space.isDown && this.sprite.body.onFloor()) {
      this.sprite.setVelocityY(-500);
      if(!this.avatar){
        this.sprite.play("idle", true);
      }
    }

    if (this.timer > 100 / this.scene.state.speed) {
      this.timer = 0;
      // updateScore(this.scene.state);
      let currentScore = this.scene.state.score
      this.scene.state.score = currentScore + 1
      // console.log('score', currentScore, this.scene.state.score)
      store.dispatch({type: UPDATE_SCORE, score: this.scene.state.score})
    }
  }

  preUpdate = (time, delta) => {
    // this.weapon.x = this.sprite.x + 15
    // this.weapon.y = this.sprite.y
    if(this.hat){
        this.hat.x = this.sprite.x + 5
        this.hat.y = this.sprite.y - 20
    }

    // if(this.avatar){
    //     this.avatar.x = this.sprite.x + 5
    //     this.avatar.y = this.sprite.y - 10
    // }
  }

  die() {
    this.isDead = true;
    if(!this.avatar){
        this.sprite.play("idle", true);
    }

    this.scene.state.started = false;
    this.scene.state.gameOver = true;

    // showHighScore();
    // showGameOver();
    if (this.scene.state.score > this.scene.state.highScore) {
      // setHighScore(this.scene.state);
      this.scene.state.highScore = this.scene.state.score;
      store.dispatch({type: UPDATE_HIGHSCORE, highScore: this.scene.state.score});
    }
  }
}

export default Player;
