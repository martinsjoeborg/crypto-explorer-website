import { swap } from "../swap/swap_web3/swapWeb3";
import { useState } from "react";
import "./SwapMain.css"

const SwapMain = ({ currentAccount }) => {

    const [swapAmount, setSwapAmount] = useState("");

    const handleSwap = (e) => {
        e.preventDefault();
        const parsedSwapAmount = parseFloat(swapAmount);
        if (isNaN(parsedSwapAmount) || parsedSwapAmount <= 0) {
            console.error("Invalid swap amount");
            return;
        }
        swap(parsedSwapAmount, currentAccount);
        setSwapAmount("");
    }
    
    return (
        <div className="swap-container">
            <div className="swap-top-text">
                <h3>Swap</h3>
                <p>Crypto swapping is the direct exchange of one type of cryptocurrency for another without converting to fiat currency (usd, euro etc), typically done through decentralized exchanges (DEX's). It is a quick and cost-efficient way to trade cryptocurrencies.</p>
            </div>
            <div className="swap-interface">
                <div className="swap-form">
                    <h4>Swap SepoliaETH for some XPLRCOIN</h4>
                    <div className="convert-text">1 SepoliaETH is worth 10 000 XPLRCOIN</div>
                    <form onSubmit={handleSwap}>
                        <label>
                            
                            <input
                                className="input-field"
                                placeholder="Amount"
                                step="any" 
                                value={swapAmount}
                                onChange={(e) => setSwapAmount(e.target.value)}
                            />
                        </label>
                        <button type="submit">Swap</button>
                        {swapAmount !== "" && (
                            <div className="sepoliaETH-to-XPLRCOIN">
                                <p>You will get {swapAmount * 10**4} XPLRCOIN</p>
                            </div>
                        )}
                    </form>
                </div>

                <div className="swap-guide-text">
                    <p>On this page you will be able to swap SepoliaETH for XPLRCOIN. Each SepoliaETH is worth 10, 000 XPLRCOIN. Type the amount of SepoliaETH you want to swap and you will see below the “Swap” button exactly how much XPLRCOIN you will receive.
                    <br/><br/>
                    On real defi platforms you will usually be able to swap between many different tokens with different values. How much of a token you will get from doing a swap depends on many things. You can read more about it <a href="https://academy.moralis.io/blog/crypto-swapping-101-what-is-a-crypto-swap-and-how-does-it-work" target="_blank">here</a>. Some of the most popular platforms to do swaps on is Uniswap, 1inch and PancakeSwap.</p>
                </div>
            </div>
        </div>
    );
}
 
export default SwapMain;