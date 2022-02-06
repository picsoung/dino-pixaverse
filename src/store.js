import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import axios from "axios";
import regeneratorRuntime from "regenerator-runtime";

const initState = { players: [], score: 0, highScore: 0, gameOver: false };

//ACTION TYPES
const GET_PLAYERS = "GET_PLAYERS";
const ADD_PLAYER = "ADD_PLAYER";
export const UPDATE_SCORE = "UPDATE_SCORE";
const GAME_OVER = "GAME_OVER";
export const UPDATE_HIGHSCORE = "UPDATE_HIGHSCORE";

//ACTION CREATORS
const receivedPlayers = (players) => ({
  type: GET_PLAYERS,
  players,
});

const playerAdded = (player) => ({
  type: ADD_PLAYER,
  player,
});

export const updateScore = (score) => {
  return {
    type: UPDATE_SCORE,
    score,
  };
};
export const updateHighScore = (highScore) => {
    return {
      type: UPDATE_HIGHSCORE,
      highScore,
    };
  };

export const gameIsOver = () => ({
  type: GAME_OVER,
});

//THUNKS
export const fetchPlayers = () => {
  return async (dispatch) => {
    try {
      const { data: players } = await axios.get("/api/players");
      dispatch(receivedPlayers(players));
    } catch (error) {
      console.error("Error fetching players");
    }
  };
};

export const addPlayer = (playerInfo) => {
  return async (dispatch) => {
    try {
      const { data: player } = await axios.post("/api/players", playerInfo);
      dispatch(playerAdded(player));
    } catch (error) {
      console.error("Error adding player");
    }
  };
};

//REDUCER
const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PLAYERS:
      return { ...state, players: action.players };
    case ADD_PLAYER:
      return { ...state, players: [...state.players, action.player] };
    case UPDATE_SCORE:
      return { ...state, score: action.score };
    case UPDATE_HIGHSCORE:
      return { ...state, highScore: action.highScore };
    case GAME_OVER:
      return { ...state, gameOver: true };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store;
