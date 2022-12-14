import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ethers } from "ethers";
import walletContext from "../Context/walletContext";
import CreateWallet from "../components/CreateWallet";
function Ethereum() {
  const [activeTab, setActiveTab] = useState(1);
  const [balanceData, setBalanceData] = useState({
    url: "http://127.0.0.1:7545",
    address: "",
    balance: "",
  });

  const [transactionData, setTransactionData] = useState({
    url: "http://127.0.0.1:7545",
    to: "",
    value: 0,
    gasLimit: 4712388,
    gasPrice: 100000000000,
    response: "",
    error: "",
  });

  const { accountSelected, dispatch } = useContext(walletContext);

  const history = useNavigate();

  const changeActiveTab = (e) => {
    setActiveTab(e.target.id);
  };

  const onChangeBalance = (e) => {
    setBalanceData({ ...balanceData, [e.target.id]: e.target.value });
  };
  const onChangeTransaction = (e) => {
    setTransactionData({ ...transactionData, [e.target.id]: e.target.value });
  };

  const onSubmitBalance = (e) => {
    e.preventDefault();
    //axios post to rcpNodeUrl
    console.log(balanceData);
    axios
      .post(balanceData.url, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance",
        params: [balanceData.address, "latest"],
      })
      .then((response) => {
        setBalanceData({
          ...balanceData,
          balance: ethers.utils.formatEther(response.data.result),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmitTransaction = (e) => {
    e.preventDefault();

    const provider = new ethers.providers.JsonRpcProvider(transactionData.url);
    const wallet = accountSelected.connect(provider);
    const gasPrice = provider.getGasPrice();

    const tx = {
      from: accountSelected.address,
      to: transactionData.to,
      value: ethers.utils.parseEther(transactionData.value),
      gasLimit: ethers.utils.hexlify(transactionData.gasLimit),
      gasPrice: gasPrice,
      nonce: provider.getTransactionCount(accountSelected.address),
    };
    console.log(tx);
    wallet.sendTransaction(tx).then((response) => {
      setTransactionData({
        ...transactionData,
        response: response,
      });
    });

    // axios
    //   .post(transactionData.url, {
    //     jsonrpc: "2.0",
    //     id: 1,
    //     method: "eth_sendTransaction",
    //     params: {
    //       from: accountSelected.address,
    //       to: transactionData.to,
    //       value: transactionData.value,
    //       gasLimit: transactionData.gasLimit,
    //       gasPrice: transactionData.gasPrice,
    //     },
    //   })
    //   .then((response) => {
    //     setTransactionData({
    //       ...transactionData,
    //       response: response.data.result,
    //       error: response.data.error,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  if (accountSelected === null) {
    return <CreateWallet />;
  }

  return (
    <div>
      <div className="btn-group absolute top-5 left-5">
        <div
          className="btn btn-large"
          onClick={() => {
            history(-1);
          }}
        >
          Back
        </div>
      </div>
      <div className="container mx-auto h-screen pt-10">
        <div className="flex flex-col items-center justify-start h-full">
          <div className="text-group my-10 text-center">
            <h1 className="text-3xl font-bold ">
              Welcome to the <span className="text-blue-500">Ethereum</span>{" "}
              Wallet
            </h1>
            <span className="badge badge-primary">
              {accountSelected.address}
            </span>
          </div>
          <div class="tabs mx-auto">
            <a
              class={`tab tab-bordered ${activeTab == 1 ? "tab-active" : ""}`}
              onClick={changeActiveTab}
              id={1}
            >
              Check Balance
            </a>
            <a
              class={`tab tab-bordered ${activeTab == 0 ? "tab-active" : ""}`}
              onClick={changeActiveTab}
              id={0}
            >
              Make Transaction
            </a>
          </div>
          {activeTab == 1 &&
            (!balanceData.balance ? (
              <div className="mt-5 w-1/2 flex flex-col gap-y-5">
                <input
                  type="text"
                  placeholder="Enter Ethereum RPC Server"
                  class="input input-bordered input-primary w-full max-w-sm"
                  id="url"
                  onChange={onChangeBalance}
                  value={balanceData.url}
                />
                <input
                  type="text"
                  placeholder="Enter Account Address"
                  class="input input-bordered input-primary w-full max-w-sm"
                  id="address"
                  onChange={onChangeBalance}
                  value={balanceData.address}
                />
                <button className="btn btn-outline" onClick={onSubmitBalance}>
                  Check Balance
                </button>
              </div>
            ) : (
              <div className="mt-5 w-1/2 flex flex-col gap-y-5">
                <div className="text-group text-center">
                  <h1 className="text-xl font-bold">
                    Balance: {balanceData.balance} ETH
                  </h1>
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      setBalanceData((prevState) => ({
                        ...prevState,
                        balance: "",
                      }));
                    }}
                  >
                    Check new balance
                  </button>
                </div>
              </div>
            ))}
          {activeTab == 0 &&
            (!(transactionData.response || transactionData.error) ? (
              <div className="mt-5 w-1/2 flex flex-col gap-y-5">
                <input
                  type="text"
                  placeholder="Enter Ethereum RPC Server"
                  class="input input-bordered input-primary w-full max-w-sm"
                  id="url"
                  onChange={onChangeTransaction}
                  value={transactionData.url}
                />
                <input
                  type="text"
                  placeholder="Enter Account Address To"
                  class="input input-bordered input-primary w-full max-w-sm"
                  id="to"
                  onChange={onChangeTransaction}
                  value={transactionData.to}
                />
                <input
                  type="number"
                  placeholder="Enter Amount"
                  class="input input-bordered input-primary w-full max-w-sm"
                  id="value"
                  onChange={onChangeTransaction}
                  value={transactionData.value}
                />
                <input
                  type="number"
                  placeholder="Enter Gas Limit"
                  class="input input-bordered input-primary w-full max-w-sm"
                  id="gasLimit"
                  onChange={onChangeTransaction}
                  value={transactionData.gasLimit}
                />
                <input
                  type="number"
                  placeholder="Enter Gas Price"
                  class="input input-bordered input-primary w-full max-w-sm"
                  id="gasPrice"
                  onChange={onChangeTransaction}
                  value={transactionData.gasPrice}
                />
                <button
                  className="btn btn-outline"
                  onClick={onSubmitTransaction}
                >
                  Make Transaction
                </button>
              </div>
            ) : (
              <div className="mt-5 w-full px-5 flex flex-col gap-y-5">
                <div className="text-group text-center">
                  <div className="my-5 w-full h-1/2 overflow-x-auto bg-[#f7f6f3]">
                    <p className="mx-auto p-2 text-left">
                      <pre>
                        {transactionData.error
                          ? JSON.stringify(transactionData.error, null, 2)
                          : JSON.stringify(transactionData.response, null, 2)}
                      </pre>
                    </p>
                  </div>
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      setTransactionData((prevState) => ({
                        ...prevState,
                        response: "",
                        error: "",
                      }));
                    }}
                  >
                    Make new transaction
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Ethereum;
