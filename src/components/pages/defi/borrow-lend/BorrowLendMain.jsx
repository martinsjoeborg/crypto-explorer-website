import { useState } from "react";
import { depositCollateral, borrow, getRepayAmount, repay, deposit, withdraw } from "./borrow-lend-web3/borrowLendWeb3";
import { approveBorrowLend } from "./borrowLendTokenApproval/borrowLendTokenApproval";
import "./BorrowLendMain.css"


const BorrowLendMain = ({currentAccount}) => {

    const [collateralAmount, setCollateralAmount] = useState("");
    const [borrowAmount, setBorrowAmount] = useState("");
    const [repayAmount, setRepayAmount] = useState(0);
    const [approveRepayAmount, setApproveRepayAmount] = useState("");
    const [lockDuration, setLockDuration] = useState("")
    const [depositAmount, setDepositAmount] = useState("");

    const handleCollateral = (e) => {
        e.preventDefault();
        depositCollateral(collateralAmount, currentAccount);
        setCollateralAmount("");
    }

    const handleBorrow = (e) => {
        e.preventDefault();
        borrow(borrowAmount, currentAccount);
        setBorrowAmount("");
    }

    const getRepay = async () => {
        try {
            const amount = await getRepayAmount(currentAccount);
            const parsedAmount = parseInt(amount);
            setRepayAmount(parsedAmount);
        } catch (error) {
            console.error("Error getting amount:", error);
        }
    }

    const handleApproveRepay = (e) => {
        e.preventDefault();
        approveBorrowLend("0x84F097F0C6b94F3D2D6b01b1A2Ade9930C115988", approveRepayAmount, currentAccount);
    }

    const handleRepay = (e) => {
        e.preventDefault();
        repay(currentAccount);
        setApproveRepayAmount("");
    }

    const handleApproveDeposit = (e) => {
        e.preventDefault();
        approveBorrowLend("0x84F097F0C6b94F3D2D6b01b1A2Ade9930C115988", depositAmount, currentAccount);
    }

    const handleDeposit = (e) => {
        e.preventDefault();
        deposit(depositAmount, lockDuration, currentAccount);
        setDepositAmount("");
    }

    const handleWithdraw = (e) => {
        e.preventDefault();
        withdraw(currentAccount);
    }

    return (
        <div className="borrowLend-container">

            <div className="borrowLend-top-text">
                <h3>Borrow & Lending</h3>

                <p>Borrowing and lending crypto refers to the process by which individuals can deposit cryptocurrency to lend out to borrowers and receive interest payments in return, or borrow money using their cryptocurrency as collateral without any intermediaries. This can be done through crypto lending platforms which can either be centralized (CeFi) or decentralized (DeFi). </p>
            </div>

            <div className="borrowLend-guide-text">
                <div className="borrow-text">
                    <h4>Borrow</h4>

                    <p>To borrow, deposit an amount of sepoliaETH as collateral. Whatever amount you choose to deposit, you will be eligible to borrow up to 75% of that amount in XPLRCOIN. Once borrowed, you can click “Get Repay Amount” to see what your current repayment amount is. This is the amount you have borrowed + the interest. When paying back the loan, enter a slightly larger amount in the “Repay amount” input field. The current repay amount is constantly rising and there is a slight delay on how much the current amount is.

                        <br /><br />
                        
                        This interface is inspired by the functionality of the lending platform <a href="https://aave.com/" target="blank">Aave</a>. The fundamentals are quite similar but there are still some big differences. On Aave, you are able to borrow many different cryptocurrencies against collateral on different chains. Same as on this site, you pay interest when borrowing on Aave. On Aave, you have a certain amount of time to pay back the loan. If you don’t pay it back during this time the crypto you deposited as collateral will be liquidated, meaning Aave will lock it as part of their liquidity pool. There is no payback time on this site. 
                    </p>
                </div>

                <div className="lend-text">
                    <h4>Lend</h4>
                    <p>You can deposit XPLRCOIN to earn interest in the interface below. You will have to approve that it's okay for the contract to use your set amount of tokens before depositing. It is common that you lock your funds for a period of time, meaning you can't withdraw your funds before the lock duration has expired. Locking your funds for a longer period will give you more reward. After the lock duration has expired, you are free to withdraw your funds. Clicking the “Withdraw” button will withdraw your deposited funds as well as transfer the reward to your wallet.
                        <br /><br />
                        To lend crypto usually means to help supply the platform's <a href="https://decrypt.co/resources/what-are-liquidity-pools-the-funds-that-keep-defi-running" target="blank">liquidity pool</a> with <a href="https://www.investopedia.com/terms/l/liquidity.asp" target="blank">liquidity</a>. To encourage lenders to do this, the lender earns a reward (interest) in the form of cryptocurrencies for depositing their funds to the <a href="https://koinly.io/sv/crypto-glossary/protocol/" target="blank">protocol</a>. You can read more about borrowing and lending in defi <a href="https://yield.app/blog/defi-lending-and-borrowing-guide" target="blank">here</a>. Some of the most popular lending platforms in defi are <a href="https://aave.com/" target="blank">Aave</a>, <a href="https://makerdao.com/en/" target="blank">Maker</a> and <a href="https://compound.finance/" target="blank">Compound</a>.
                    </p>
                </div>
            </div>

            <div className="borrowLend-form-container">
                <div className="borrow-container">
                    <h4>Deposit & Borrow</h4>

                    <div className="collateral-form">
                        <div className="borrow-info-text">SepoliaETH as collateral</div>
                        <form onSubmit={handleCollateral}>
                            <label>
                                <input
                                    placeholder="Collateral amount"
                                    step="any"
                                    value={collateralAmount}
                                    onChange={(e) => setCollateralAmount(e.target.value)}
                                />
                            </label>
                            <button className="collateral-btn">Deposit</button>
                        </form>
                        {collateralAmount !== "" && (
                        <div className="sepoliaETH-to-XPLRCOIN">
                            <p>Able to borrow up to {(collateralAmount * 10**4)*0.75} XPLRCOIN</p>
                        </div>
                        )}
                    </div>

                    <div className="borrow-form">
                        <div className="borrow-info-text">Specify amount to borrow</div>
                        <form onSubmit={handleBorrow}>
                            <label>
                                <input
                                    placeholder="Borrow amount"
                                    step="any"
                                    value={borrowAmount}
                                    onChange={(e) => setBorrowAmount(e.target.value)}
                                />
                            </label>
                            <button>Borrow</button>
                        </form>
                    </div>

                    <h4>Repay</h4>
                    
                    <div className="repayAmount-container">
                        <button className="getRepayAmount" onClick={getRepay}>Get Repay Amount</button>
                        <p>Current repay amount: {repayAmount} XPLRCOIN</p>
                    </div>
                    

                    <div className="approve-form">
                        <p>Specify amount to approve for repay</p>
                        <form onSubmit={handleApproveRepay}>
                            <label>
                                <input
                                    placeholder="Repay amount"
                                    step="any"
                                    value={approveRepayAmount}
                                    onChange={(e) => setApproveRepayAmount(e.target.value)}
                                />
                            </label>
                            <button>Approve</button>
                        </form>
                    </div>
                    
                    <button className="repayBtn" onClick={handleRepay}>Repay</button>
                </div>

                <div className="lend-container">
                    <h4>Lend XPLRCOIN</h4>
                    <div className="deposit-form">

                        <form onSubmit={handleApproveDeposit}>
                            Specify amount of XPLRCOIN's to deposit
                            <label >
                                <input
                                    placeholder="Deposit amount"
                                    step="any"
                                    value={depositAmount}
                                    onChange={(e) => setDepositAmount(e.target.value)}
                                />
                            </label>
                            
                            <button>Approve</button>
                        </form>

                        <div className="lockDuration-container">
                            <p>Choose amount of seconds to lock funds</p>
                            <div className="lockDurationBtns">
                                <button onClick={() => setLockDuration(10)}>10</button>
                                <button onClick={() => setLockDuration(20)}>20</button>
                                <button onClick={() => setLockDuration(30)}>30</button>
                            </div>
                        </div>

                        <button onClick={handleDeposit} className="lend-deposit-btn">Deposit</button>
                    </div>

                    <div className="withdraw-container">
                        <button onClick={handleWithdraw}>Withdraw</button>
                    </div>

                </div>

            </div>

        </div>
    );
}
 
export default BorrowLendMain;