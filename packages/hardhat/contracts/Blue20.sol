// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IBlue20.sol";
contract Blue20 is IBlue20, ERC20, Ownable {
    constructor() ERC20("BLUE", "BLUE") {
    }

    function mint(address receiver) external onlyOwner {
        _mint(receiver, 1);
    }
}