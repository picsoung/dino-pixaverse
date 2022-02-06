import React, { Component } from "react";
import ReactDOM from "react-dom";

import store from "./store";
import { Provider } from "react-redux";

import Game from "./components/Game";
import ScoreForm from "./components/ScoreForm";
class App extends Component {
  render() {
    return (
      <div>
        <div className="content">
          <h1> Hello World</h1>
          <ScoreForm />
        </div>
        <div className="game-container">
          <Game />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
