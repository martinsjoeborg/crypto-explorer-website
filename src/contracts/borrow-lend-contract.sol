// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(address to, uint256 amount) external;
    function transferFrom(address from, address to, uint256 amount) external;
    function balanceOf(address account) external view returns (uint256);
}

contract LendingBorrowing {
    IERC20 public token;
    uint256 public constant COLLATERAL_RATIO = 75;
    uint256 public constant SEPOLIA_ETH_TO_ERC20_RATIO = 10000;
    uint256 public constant INTEREST_RATE_PER_SECOND = 1000000000000000;

    struct Deposit {
        uint256 amount;
        uint256 startTime;
        uint256 lockDuration;
    }

    struct Borrow {
        uint256 amount;
        uint256 collateral;
        uint256 startTime;
    }

    mapping(address => Deposit) public deposits;
    mapping(address => Borrow) public borrows;

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function getCurrentRepaymentAmount() external view returns (uint256) {
        Borrow storage userBorrow = borrows[msg.sender];
        if (userBorrow.amount == 0) {
            return 0;
        }
        uint256 timeElapsed = block.timestamp - userBorrow.startTime;
        uint256 interest = calculateInterest(userBorrow.amount, timeElapsed);
        return userBorrow.amount + interest;
    }
    
    function deposit(uint256 amount, uint256 lockDuration) external {
        require(lockDuration == 10 || lockDuration == 20 || lockDuration == 30, "Invalid duration");
        token.transferFrom(msg.sender, address(this), amount);
        deposits[msg.sender] = Deposit(amount, block.timestamp, lockDuration);
    }

    function withdraw() external {
        Deposit storage userDeposit = deposits[msg.sender];
        require(block.timestamp >= userDeposit.startTime + userDeposit.lockDuration, "Lock period not ended");
        uint256 interest = calculateInterest(userDeposit.amount, userDeposit.lockDuration);
        token.transfer(msg.sender, userDeposit.amount + interest);
        delete deposits[msg.sender];
    }

    function depositCollateral() external payable {
        require(msg.value > 0, "Collateral must be greater than 0");
        borrows[msg.sender].collateral += msg.value;
    }

    function borrow(uint256 amount) external {
        Borrow storage userBorrow = borrows[msg.sender];
        uint256 collateralInERC20 = userBorrow.collateral * SEPOLIA_ETH_TO_ERC20_RATIO;
        uint256 maxBorrow = collateralInERC20 * COLLATERAL_RATIO / 100;
        require(amount <= maxBorrow, "Exceeds max borrow limit");

        userBorrow.amount += amount;
        userBorrow.startTime = block.timestamp;
        token.transfer(msg.sender, amount);
    }

    function repay() external {
        Borrow storage userBorrow = borrows[msg.sender];
        uint256 timeElapsed = block.timestamp - userBorrow.startTime;
        uint256 interest = calculateInterest(userBorrow.amount, timeElapsed);
        uint256 totalRepayAmount = userBorrow.amount + interest;

        uint256 userBalance = token.balanceOf(msg.sender);
        require(userBalance >= totalRepayAmount, "You do not have enough in your wallet to repay the loan.");

        token.transferFrom(msg.sender, address(this), totalRepayAmount);
        payable(msg.sender).transfer(userBorrow.collateral);
        delete borrows[msg.sender];
    }

    function calculateInterest(uint256 amount, uint256 duration) private pure returns (uint256) {
        return amount * INTEREST_RATE_PER_SECOND * duration / 1e18;
    }
}