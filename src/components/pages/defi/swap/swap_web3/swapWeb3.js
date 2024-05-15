import Web3 from "web3";
import { SWAP_CONTRACT_ADDRESS, SWAP_CONTRACT_ABI } from "../../../../../configs/swap-contract-config/swap_config";

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(SWAP_CONTRACT_ABI, SWAP_CONTRACT_ADDRESS);

export const swap = (swapAmount, currentAccount) => {
  
    contract.methods.swap().send({
        from: currentAccount,
        value: web3.utils.toWei(swapAmount.toString(), 'ether')
    })
    .on('transactionHash', hash => {
        console.log('Transaction Hash:', hash);
    })
    .on('receipt', receipt => {
        console.log('Transaction Receipt:', receipt);
    })
    .on('error', error => {
        console.error(error);
    });
  };