import React, { useContext } from "react";
import walletContext from "../Context/walletContext";
import { ethers } from "ethers";
function CreateWallet() {
  const { dispatch, accounts, accountSelected } =
    React.useContext(walletContext);
  const [walletName, setWalletName] = React.useState("");
  const [walletKey, setWalletKey] = React.useState("");
  //get the wallet dispatcher
  const onSubmit = (e) => {
    e.preventDefault();
    //check wallet name is not empty
    if (!walletName !== "") {
      const wallet = ethers.Wallet.createRandom();
      //set the account selected to the new wallet
      dispatch({ type: "SET_ACCOUNT_SELECTED", payload: wallet });
      dispatch({ type: "ADD_ACCOUNT", payload: wallet });
    }
    if (walletKey !== "") {
      const wallet = new ethers.Wallet(walletKey);
      dispatch({ type: "SET_ACCOUNT_SELECTED", payload: wallet });
      dispatch({ type: "ADD_ACCOUNT", payload: wallet });
      console.log(wallet);
    }
  };
  return (
    <div className="container mx-auto h-screen pt-10">
      <div className="flex flex-col items-center justify-start h-full">
        <div className="text-center my-10">
          <h2 className="text-3xl font-bold">Create a Wallet</h2>
          <label className="text-xl">Enter wallet name</label>
          <input
            type="text"
            placeholder="Enter Account Name"
            class="input input-bordered input-primary w-full max-w-sm"
            id="Name"
            onChange={(e) => setWalletName(e.target.value)}
            value={walletName}
          />
          <p>OR</p>
          <h2 className="text-3xl font-bold">Import Wallet</h2>
          <label className="text-xl">Enter Private Key</label>
          <input
            type="text"
            placeholder="Enter Private Key"
            class="input input-bordered input-primary w-full max-w-sm"
            id="PrivateKey"
            onChange={(e) => setWalletKey(e.target.value)}
            value={walletKey}
          />

          <button className="btn btn-outline mt-10" onClick={onSubmit}>
            Create Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateWallet;
