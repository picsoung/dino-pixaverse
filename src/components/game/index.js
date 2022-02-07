import "phaser";
import React from "react";

// Import your Scenes
import Dino from "./scenes/dino";

export default class Game extends React.Component {
  componentDidMount() {
    const config = {
      type: Phaser.AUTO,
      width: 640,
      height: 480,
      pixelArt: true,
      physics: {
        default: "arcade",
        arcade: {
          debug: false, //, set debug to true if you want collision boxes to be drawn
          gravity: {
            y: 1000,
          },
        },
      },
      scale: {
        parent: "game-container",
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
      },
      scene: [Dino],
    };
    new Phaser.Game(config);
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return <div id="phaser-game" />;
  }
}
