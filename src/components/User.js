import React, { useState, useEffect } from "react";
import store, { UPDATE_AVATAR }  from "../store";
import { connect, useSelector } from "react-redux";
import { useMoralis, useNFTBalances } from "react-moralis";
import { Moralis } from "moralis";

function User() {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  const [NFTs, setNFTs] = useState([]);
  const { getNFTBalances, data, error, isLoading, isFetching } = useNFTBalances();

  const retrieveNFTs = async () => {
    // let { getNFTBalances, data, error, isLoading, isFetching } = useNFTBalances();
    let balance = getNFTBalances({ params: { chain: "0x1" } })
    // let options = { chain: "mumbai", address: user.address };
    // let balance = await Moralis.Web3API.account.getNFTs(options);
    console.log("balance", balance);
    if (balance) {
      setNFTs(balance.result);
    }
  };

  const changeAvatar = async (avatarURL) =>{
      console.log(store)
      store.dispatch({ type: UPDATE_AVATAR, avatar: avatarURL});
  }

  useEffect(()=>{
    console.log('data', data)
    if(data){
      setNFTs(data.result);
    }
  },[data])

  useEffect(()=>{
    if(isAuthenticated){
        console.log(user, user.get('gamesPlayed'))
    }
  },[isAuthenticated])

  return (
    <>
      {!isAuthenticated ? (
        <div>
          <button onClick={() => authenticate()}>Authenticate</button>
        </div>
      ) : (
        <div>
          <h1>Welcome {user.get("username")}</h1>
          <button onClick={() => retrieveNFTs()}>Get NFTs</button>
          <button onClick={() => logout()}>Logout</button>
          <button onClick={()=> changeAvatar()}>Create Player</button>
          <ul>
            {NFTs &&
              NFTs.length > 0 &&
              NFTs.map((r) => {
                return (
                <li key={r.token_address}>{r.name} <img height="200" src={r.image} onClick={()=>changeAvatar(r.image)}/></li>)
              })}
          </ul>
        </div>
      )}
    </>
  );
}

export default User;
