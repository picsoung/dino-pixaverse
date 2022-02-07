const fetch = require("node-fetch");
const FormData = require("form-data");

let REWARDS = {
  hs_above_100: "https://i.ibb.co/hfrS03P/axe.png",
};

export const mint = (address, type) => {
  console.log(REWARDS[type]);
  const options = {
    method: "POST",
    body: JSON.stringify({
      chain: "polygon",
      name: "Pixaverse",
      file_url: REWARDS[type],
      description: "A reward to equip your character in the pixaverse",
      mint_to_address: address,
    }),
    headers: {
      Authorization: "194d12a2-791f-49eb-92a9-a61346bbcc27",
      "Content-Type": "application/json",
    },
  };

  fetch("https://api.nftport.xyz/v0/mints/easy/urls", options)
    .then(function (response) {
      return response.json();
    })
    .then(function (responseJson) {
      // Handle the response
      console.log(responseJson);
    });
};
