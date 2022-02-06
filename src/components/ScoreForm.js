import React, { useState } from "react";
import { addPlayer, updateScore } from "../store";
import { connect, useSelector } from "react-redux";

function ScoreForm() {
//   let [score, setscore] = useState(0);
  const score = useSelector((state) => state.score)
  const highScore = useSelector((state) => state.highScore)

  return (
    <div>
      <h1>Score {score.toString().padStart(6, '0')}</h1>
      <h1>HI {highScore.toString().padStart(6, '0')}</h1>
    </div>
  );
}
// const mapState = (state) => ({
//   score: state.score,
//   gameOver: state.gameOver,
// });

// const mapDispatch = (dispatch) => ({
//   addPlayer: (player) => dispatch(addPlayer(player)),
//   updatescore: (score) => dispatch(updateScore(score)),
// });

export default ScoreForm;
