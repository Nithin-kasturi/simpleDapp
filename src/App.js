import React, { useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const { ethereum } = window;
  const [account, setAccount] = useState("");
  const [contractData, setContractData] = useState('');
  const [mesg, setMesg] = useState('');
  const [contract, setContract] = useState(null);

  const connectMetaMask = async () => {
    try {
      if (ethereum) {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } else {
        alert('Connect to MetaMask');
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  const connectContract = async () => {
    const contractAddress = '0xd62463cd298DCEb72443cE49D5bec49017dAdEf5';
    const contractABI = 
      [
        {
          "inputs": [],
          "name": "getMessage",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "mesg",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_mesg",
              "type": "string"
            }
          ],
          "name": "setMessage",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
    ];

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const newContract = new ethers.Contract(contractAddress, contractABI, signer);
      const c = await newContract.getAddress();
      console.log("Connected to contract. Contract address:", c);
      setContract(newContract);
    } catch (error) {
      console.error("Error connecting to contract:", error);
    }
  };

  const getMessage = async () => {
    if (contract) {
      const mesgResponse = await contract.getMessage();
      console.log(mesgResponse);
      setContractData(mesgResponse);
    }
  };

  const setMessage = async () => {
    if (contract) {
      console.log(mesg);
      const mesgResponse = await contract.setMessage(mesg);
      const mesgReceipt = await mesgResponse.wait();
      console.log(mesgReceipt);
    }
  };

  return (
    <div>
      <button onClick={connectMetaMask}>Connect to MetaMask</button>
      <h3>{account}</h3>
      <button onClick={connectContract}>Connect to Contract</button>
      <button onClick={getMessage}>Get message</button>
      <h1>{contractData}</h1>
      <input onChange={(e) => setMesg(e.target.value)} type='text' placeholder='Enter to change' name='mesg' />
      <button type='submit' onClick={setMessage}>Click to change</button>
    </div>
  );
}

export default App;
