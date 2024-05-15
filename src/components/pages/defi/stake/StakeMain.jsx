import { useState } from "react";
import { stake, getReward, withdraw, getBalanceOf, getEarnedRewards } from "./stake_web3/stakeWeb3";
import { approveStake } from "./stakeTokenApproval/stakeTokenApproval.js";
import "./StakeMain.css"

const StakeMain = ({ currentAccount }) => {

    const [stakeAmount, setStakeAmount] = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");

    const [balanceOfCurrentAccount, setBalanceOfCurrentAccount] = useState(0);
    const [earnedRewardsCurrentAccount, setEarnedRewardsCurrentAccount] = useState(0);

    const handleApprove = (e) => {
        e.preventDefault();
        const parsedStakeAmount = parseFloat(stakeAmount);
        if (isNaN(parsedStakeAmount) || parsedStakeAmount <= 0) {
            console.error("Invalid stake amount");
            return;
        }
        approveStake("0xFFD934070C777C68004F23423913Ec9BC52afeD6", stakeAmount, currentAccount);
    }

    const handleStake = (e) => {
        e.preventDefault();
        const parsedStakeAmount = parseFloat(stakeAmount);
        if (isNaN(parsedStakeAmount) || parsedStakeAmount <= 0) {
            console.error("Invalid stake amount");
            return;
        }
        stake(parsedStakeAmount, currentAccount);
        setStakeAmount("");
    }

    const handleGetReward = (e) => {
        e.preventDefault();
        getReward(currentAccount);
    }

    const handleWithdraw = (e) => {
        e.preventDefault();
        const parsedWithdrawAmount = parseFloat(withdrawAmount);
        if (isNaN(parsedWithdrawAmount) || parsedWithdrawAmount <= 0) {
            console.error("Invalid withdraw amount");
            return;
        }
        withdraw(parsedWithdrawAmount, currentAccount);
        setWithdrawAmount("");
    }

    const getBalance = async () => {
        try {
            const balance = await getBalanceOf(currentAccount);
            const parsedBalance = parseInt(balance);
            setBalanceOfCurrentAccount(parsedBalance);
        } catch (error) {
            console.error("Error getting balance:", error);
        }
    };

    const getEarned = async () => {
        try {
            const balance = await getEarnedRewards(currentAccount);
            const parsedBalance = parseInt(balance);
            setEarnedRewardsCurrentAccount(parsedBalance);
        } catch (error) {
            console.error("Error getting rewards:", error);
        }
    };
    
    
    return (
        <div className="stake-container">
            <div className="stake-top-text">
                <h3 >Stake</h3>
                <p>Staking offers crypto holders a way of putting their digital assets to work and earning passive income without needing to sell them. You can think of staking as the crypto equivalent of putting money in a high-yield savings account.</p>
            </div>

            <div className="stake-interface">

                <div className="stake-form">

                    <div className="stake">
                        <h4>Stake XPLRCOIN</h4>
                        <form onSubmit={handleApprove}>
                            <label>
                                <input
                                    placeholder="Amount to stake"
                                    className="input-field"                                   
                                    step="any" 
                                    value={stakeAmount}
                                    onChange={(e) => setStakeAmount(e.target.value)}
                                />
                            </label>
                            <button>Approve</button>
                        </form>
                        <button onClick={handleStake}>Stake</button>

                    </div>

                    <div className="withdraw">
                        <h4>Withdraw and get reward</h4>
                        <div className="withdraw-content">
                            <div className="amountStaked getValue">
                                <button onClick={getBalance} className="staked-btn">Staked</button><br/>
                                You have staked: {balanceOfCurrentAccount} XPLRCOIN's
                                
                            </div>

                            <div className="amountEarned getValue">
                                <button onClick={getEarned}>Earned</button><br/>
                                You have earned: {earnedRewardsCurrentAccount} XPLRCOIN's
                            </div>

                            <div className="withdraw-form">
                                <form onSubmit={handleWithdraw}>
                                    <label>
                                        <input
                                            placeholder="Amount to withdraw"
                                            className="input-field"
                                            step="any"
                                            value={withdrawAmount}
                                            onChange={(e) => setWithdrawAmount(e.target.value)}
                                        />
                                    </label>
                                    <button>Withdraw</button>
                                </form>

                                <div className="getRewards">
                                    <button className="getRewardsBtn" onClick={handleGetReward}>Get Reward</button>
                                </div>

                            </div>
                            
                        </div>
                        
                    </div>

                </div>

                <div className="stake-guide-text">
                    <p>On the interface to your left, you can stake XPLRCOIN to get rewards. It works like this: Enter the amount you want to stake. Click the “Approve” button to give the contract permission to transfer the specified amount of tokens on your behalf. This function is a part of the <a href="https://ethereum.org/en/developers/docs/standards/tokens/erc-20" target="blank">ERC20 standard</a> and you will encounter this on many defi platforms. After you have approved you can stake your entered amount. You can see how much you have staked and how much you have earned. To withdraw and get your reward, simply enter the amount you want to withdraw and get your reward.
                        <br/><br/>Real staking protocols are usually more advanced than this one. You might be able to stake more than one token, the amount of reward you will receive is usually defined as an <a href="https://coinmarketcap.com/academy/article/apr-vs-apy-in-crypto-what-s-the-difference" target="blank">APY</a> (Annual Percentage Yield) or based on how much you have staked and for how long.
                        In <a href="https://consensys.io/blog/what-is-proof-of-stake" target="blank">proof of stake</a> networks like Ethereum 2.0, Cardano and Cosmos people can stake to help the network validate data and keep the network secure.

                    </p>
                </div>
                

            </div>
            
        </div>
    );
}
 
export default StakeMain;