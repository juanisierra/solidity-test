import Web3 from 'web3';

 // Connecting new web3 instance to the provider injected by metamask
window.ethereum.request({ method: "eth_requestAccounts" });

const web3 = new Web3(window.ethereum);

export default web3;
