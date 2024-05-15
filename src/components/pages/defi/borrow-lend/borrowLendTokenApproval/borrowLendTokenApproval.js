import Web3 from "web3";
import { TOKEN_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI } from "../../../../../configs/token-contract-config/token_config";

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS);

export const approveBorrowLend = (spender, value, currentAccount) => {

    const weiValue = web3.utils.toWei(value.toString(), 'ether');
  
    contract.methods.approve(spender, weiValue).send({
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