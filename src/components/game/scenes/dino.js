import generateAnimations from "../animations/index.js";
import Player from "../objects/Player";
import Star from "../objects/Star";
import Cactus from "../objects/Cactus";
import Avatar from "../objects/Avatar";

import tilesImg from "../assets/img/tiles.png";
import atlasImg from "../assets/img/atlas.png";
import atlasJson from "../assets/json/atlas.json";
import axeImg from "../assets/img/axe.png";

const path = require("path");

import { showScore, resetScore } from "../ui/score";
import { hidePressToPlay, hideGameOver } from "../ui/gameState";

import store, { UPDATE_SCORE } from "../../../store";

class Dino extends Phaser.Scene {
  constructor() {
    // console.log("constructor");
    super("Dino");
    this.state = {
      started: false,
      gameOver: false,
      UIUpdated: false,
      speed: 1,
      numberOfStars: 10,
      cactuses: [], // An array to hold the cactuses
      cactusDistance: 2000, // The distance in seconds between two cactuses
      timer: {
        speedLoop: 0,
        cactusSpawnLoop: 0, // A timer to keep track of the time of last spawn
      },
      score: 0,
      highScore: 0,
    };
  }

  preload() {
    // console.log("preload");
    // This is where we can preload our assets
    this.load.spritesheet("tiles", tilesImg, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.atlas("atlas", atlasImg, atlasJson);
    this.load.image("axe", axeImg);
    this.load.on("complete", () => {
      generateAnimations(this);
    });
  }

  create() {
    console.log("create");
    // This is where we will create our game objects
    this.player = new Player(
      this,
      25,
      460,
      true,
      "https://lh3.googleusercontent.com/Q4uXff5hD6T91FlaDiqZTpMu-kEgwx6IcUHXsWF_Moq5u6VOvfqKuIXN2_StL78LNiA1YW3e16vnrLq_zqvfOMtK7PLy9AcKGxWr=w600"
    );
    this.inputs = this.input.keyboard.createCursorKeys();
    for (let index = 0; index < this.state.numberOfStars; index++) {
      new Star(this);
    }
  }

  update(time, delta) {
    // console.log("update");
    this.state.timer.cactusSpawnLoop += delta;
    this.state.timer.speedLoop += delta;

    // This is where we will update the game state
    if (
      this.inputs.space.isDown &&
      !this.state.started &&
      !this.state.gameOver
    ) {
      this.state.started = true;
    }

    if (this.state.started) {
      this.player.update(this.inputs, delta);

      if (!this.state.UIUpdated) {
        // this.updateUI();
      }

      if (this.state.timer.cactusSpawnLoop > this.state.cactusDistance) {
        this.state.cactusDistance = Phaser.Math.Between(
          5000 / this.state.speed,
          1000 / this.state.speed
        );
        this.state.cactuses.push(new Cactus(this));
        this.state.timer.cactusSpawnLoop = 0;
      }

      if (this.state.timer.speedLoop > 10000) {
        this.state.timer.speedLoop = 0;
        this.state.speed += 0.25;
      }
    }

    if (this.state.gameOver) {
      this.state.cactuses.forEach((cactus) => cactus.stop());
    }

    if (this.inputs.space.isDown && this.state.gameOver) {
      this.restartGame();
    }
  }

  updateUI() {
    hidePressToPlay();
    hideGameOver();

    showScore();

    this.state.UIUpdated = true;
  }

  restartGame() {
    // hideGameOver();

    //reset score
    this.state.score = 0;
    store.dispatch({type: UPDATE_SCORE, score: this.state.score})

    this.state.started = true;
    this.state.gameOver = false;
    this.state.speed = 1;
    this.state.cactuses.forEach((cactus) => cactus.sprite.destroy());
    this.state.cactuses = [];

    this.player.isDead = false;
  }

  loadAvatar(url) {
    let avatar = new Avatar(this, url);
  }
}

export default Dino;
