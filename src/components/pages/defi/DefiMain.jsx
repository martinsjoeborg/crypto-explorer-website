import "./DefiMain.css"
import { Link } from "react-router-dom";

const DefiMain = () => {

    return (
        <div className="defi-main">

            <div className="defi-top-text-container">
                <div className="defi-title">DeFi</div>
                <div className="defi-intro-text">DeFi (decentralized finance) is an umberella term for finacial services accessible on public blockchains like Ethereum. It's a way for users to utilize finacial services without any intermediaries. You can try some of the most popular activites by clicking one of the three options below.</div>
                
            </div>

            <div className="defi-boxes">
                <Link to="/defi/swap" className="swap box">
                    <div className="title">Swap</div>
                    <div className="swap text">Swap SepoliaETH for XPLRCOIN.</div>
                </Link>

                <Link to="/defi/stake" className="stake box">
                    <div className="title">Stake</div>
                    <div className="stake text">Stake XPLRCOIN to earn a reward.</div>
                </Link>

                <Link to="/defi/borrow-lend" className="borrowLend box">
                    <div className="title">Borrow / Lending</div>
                    <div className="borrowLend text">Borrow or Lend XPLRCOIN.</div>
                </Link>
            </div>

        </div>
    );
}
 
export default DefiMain;