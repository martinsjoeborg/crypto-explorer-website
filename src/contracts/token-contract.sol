// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ExplorerCoinn is ERC20("ExplorerCoinn", "XPLRCOIN") {

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function mint100Tokens() public {
        require(msg.sender == owner);
        _mint(msg.sender, 1000000000000 * 10**18);
    }
}