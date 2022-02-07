import React, { useEffect, useState } from "react";
import { addPlayer, updateScore } from "../store";
import { connect, useSelector } from "react-redux";
import { useMoralis, useNFTBalances } from "react-moralis";
import { Moralis } from "moralis";

import {mint} from "../utils/nftport"

function ScoreForm() {
  //   let [score, setscore] = useState(0);
  const score = useSelector((state) => state.score);
  const highScore = useSelector((state) => state.highScore);
  const gameOver = useSelector((state) => state.gameOver);
  const { setUserData, userError, isUserUpdating, user,isAuthenticated } = useMoralis();
  const [showSaveHS, setShowSaveHS] = useState(false);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    if (user) {
      if (score > user.get("highScore")) {
        setUserData({
          highScore: score,
        });
      }
      setUserData({
        gamesPlayed: user.get("gamesPlayed") ? user.get("gamesPlayed") + 1 : 1,
      });
      checkEligibleForReward();
    }
  }, [gameOver]);

  const checkEligibleForReward = () => {
    if (user) {
      let highScore = user.get("highScore");
      let gamesPlayed = user.get("gamesPlayed");

      //if score > 100
      //basic reward
      setRewards([{ name: "High score above 100 points", id: "hs_above_100" }]);
      
    }
  };

  const claimReward = async (rewardId) => {
    //mint token
    //add reward to moralis
    const Reward = Moralis.Object.extend("Reward");
    const reward = new Reward();
    reward.set("ownerName", user.get('username'));
    reward.set("type", rewardId);
    await reward.save()
        .then((reward) => {
        // Execute any logic that should take place after the object is saved.
            alert('New object created with objectId: ' + reward.id);
            console.log(user.get('address'))
            mint(user.get('ethAddress'), rewardId)
        }, (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Moralis.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
        });
  }


  return (
    <div>
      <h1>Score {score.toString().padStart(6, "0")}</h1>
      <h1>This session: {highScore.toString().padStart(6, "0")}</h1>
      {isAuthenticated && user && (
        <>
          <h1>
            Your best score: {user.get("highScore").toString().padStart(6, "0")}
          </h1>
          <h1># games played: {user.get("gamesPlayed").toString()}</h1>
        </>
      )}

      {gameOver &&
        rewards &&
        rewards.length > 0 &&
        rewards.map((r) => {
          return (
            <li key={r.id}>
              {r.name}
              <button onClick={()=> claimReward(r.id)}>Claim Reward</button>
            </li>
          );
        })}
    </div>
  );
}

export default ScoreForm;
