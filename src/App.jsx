import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import './App.css'
import { useState } from "react";
import Home from "./components/pages/home/Home.jsx";
import About from "./components/pages/about/About.jsx";
import ConnectWallet from "./components/navbar/connectbtn/ConnectWallet.jsx";
import DefiMain from "./components/pages/defi/DefiMain.jsx";
import SwapMain from "./components/pages/defi/swap/SwapMain.jsx";
import StakeMain from "./components/pages/defi/stake/StakeMain.jsx";
import BorrowLendMain from "./components/pages/defi/borrow-lend/BorrowLendMain.jsx";
import DaoMain from "./components/pages/dao/DaoMain.jsx";
import NftMain from "./components/pages/nft/NftMain.jsx";

function App() {

  const [currentAccount, setCurrentAccount] = useState(null);

  return (
      <BrowserRouter>
        <div className="navbar">
          <Link to="/crypto-explorer-website/" className="header-logo">Crypto Explorer</Link>
          <nav className="menuBtns">
            <NavLink to="/crypto-explorer-website/defi" className={({ isActive }) => (isActive ? "isActive" : "defi")}>DeFi</NavLink>
            <NavLink to="/crypto-explorer-website/dao" className={({ isActive }) => (isActive ? "isActive" : "dao")}>DAO</NavLink>
            <NavLink to="/crypto-explorer-website/nft" className={({ isActive }) => (isActive ? "isActive" : "nft")}>NFT</NavLink>
          </nav>
          <ConnectWallet currentAccount={currentAccount} setCurrentAccount={setCurrentAccount} />
        </div>
        {/* <Home /> */}
        <Routes>
          <Route path="/crypto-explorer-website/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/crypto-explorer-website/defi" element={<DefiMain />} />
          <Route path="/defi/swap" element={<SwapMain currentAccount={currentAccount} />} />
          <Route path="/defi/stake" element={<StakeMain currentAccount={currentAccount}/>} />
          <Route path="/defi/borrow-lend" element={<BorrowLendMain currentAccount={currentAccount}/>} />
          <Route path="/crypto-explorer-website/dao" element={<DaoMain />} />
          <Route path="/crypto-explorer-website/nft" element={<NftMain />} />

        </Routes>
      </BrowserRouter>
  )
}

export default App
