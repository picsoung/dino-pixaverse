import React, { Component } from "react";
import ReactDOM from "react-dom";

import store from "./store";
import { Provider } from "react-redux";

import Game from "./components/Game";
import ScoreForm from "./components/ScoreForm";
import User from "./components/User";

import { MoralisProvider } from "react-moralis";

class App extends Component {
  render() {
    return (
      <div>
        <div className="content">
          <User />
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
    {/* <MoralisProvider appId="U3nCVNwOBAiwmcQcjnM5B9AnERaFrOguzHhEY8Ib" serverUrl="https://7hs3kt23rku9.usemoralis.com:2053/server"> */}
    <MoralisProvider appId="hHtzWWxCBoGDGqmwZ4FyRzFujYYRfNfkIp6iWIXx" serverUrl="https://noziyihedijb.usemoralis.com:2053/server">
      <App />
    </MoralisProvider>
  </Provider>,
  document.getElementById("root")
);
