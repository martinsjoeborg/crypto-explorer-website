import Web3 from "web3";
import { BORROWLEND_CONTRACT_ADDRESS, BORROWLEND_CONTRACT_ABI } from "../../../../../configs/borrowLend-contract-config/borrowLend-config";

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(BORROWLEND_CONTRACT_ABI, BORROWLEND_CONTRACT_ADDRESS);

export const depositCollateral = (collateralAmount, currentAccount) => {
  
    contract.methods.depositCollateral().send({
        from: currentAccount,
        value: web3.utils.toWei(collateralAmount.toString(), 'ether')
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

export const borrow = (borrowAmount, currentAccount) => {

    const weiValue = web3.utils.toWei(borrowAmount.toString(), 'ether');

    contract.methods.borrow(weiValue).send({
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

export const getRepayAmount = (currentAccount) => {

    return contract.methods.getCurrentRepaymentAmount().call({from: currentAccount})
        .then(result => {
        return web3.utils.fromWei(result, "ether");
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
};

export const repay = (currentAccount) => {

    contract.methods.repay().send({
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

export const deposit = (amount, lockDuration, currentAccount) => {

    const weiValue = web3.utils.toWei(amount.toString(), 'ether');
  
    contract.methods.deposit(weiValue, lockDuration).send({
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

export const withdraw = (currentAccount) => {

    contract.methods.withdraw().send({
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
