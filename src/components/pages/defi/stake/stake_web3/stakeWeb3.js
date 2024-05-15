import Web3 from "web3";
import { STAKE_CONTRACT_ADDRESS, STAKE_CONTRACT_ABI } from "../../../../../configs/stake-contract-config/stake_config";

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(STAKE_CONTRACT_ABI, STAKE_CONTRACT_ADDRESS);

export const stake = (value, currentAccount) => {

    const weiValue = web3.utils.toWei(value.toString(), 'ether');

    contract.methods.stake(weiValue).send({
        from: currentAccount
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
  
export const getReward = (currentAccount) => {

    contract.methods.getReward().send({
        from: currentAccount
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

export const withdraw = (value, currentAccount) => {

    const weiValue = web3.utils.toWei(value.toString(), 'ether');
  
    contract.methods.withdraw(weiValue).send({
        from: currentAccount
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

export const getBalanceOf = (currentAccount) => {

    return contract.methods.balanceOf(currentAccount).call()
        .then(result => {
        return web3.utils.fromWei(result, "ether");
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
};
  
export const getEarnedRewards = (currentAccount) => {

    return contract.methods.earned(currentAccount).call()
        .then(result => {
        return web3.utils.fromWei(result, "ether");
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
};