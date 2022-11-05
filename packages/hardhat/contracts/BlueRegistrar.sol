// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "./IBlueAvatar.sol";
import "./IBlue1155.sol";
import "./IBlue721.sol";
import "./IBlue20.sol";

contract BlueRegistrar is Ownable {
  using ECDSA for bytes32; 
  struct Record {
    uint256 lastDate; 
    uint256 total;
  }

  uint256 public maxPerDay = 2; // brush twice but configurable
  uint256 public day = 24 * 60 * 60; // seconds per day

  mapping(address => Record) public balance;
  IBlue1155 public blue1155; // accessories
  IBlue721 public blue721; // actual NFT
  IBlue20 public blue20; // token
  IBlueAvatar public blueAvatar; // wrap for our avatar library
  
  constructor(IBlue1155 _blue1155, IBlue721 _blue721, IBlue20 _blue20, IBlueAvatar _blueAvatar) {
    require(address(_blue1155) != address(0) && address(_blue721) != address(0) && address(_blue20) != address(0), 'Invalid args');
    
    blue1155 = _blue1155;
    blue721 = _blue721;
    blue20 = _blue20;
    blueAvatar = _blueAvatar;
  }

  function setMax(uint256 _maxPerDay) external onlyOwner {
    require(_maxPerDay > 0, "Max per day must be greater than 0");
    maxPerDay = _maxPerDay;
  }

  // externally register the user (somehow) to make sure we don't have bots and spammers
  // need a mechanism to do this reliably
  function registerUser(bytes memory signature) external {
    bytes32 messagehash = keccak256(abi.encodePacked(msg.sender));

    address signer = messagehash.toEthSignedMessageHash().recover(signature);
    require(signer == owner(), "permission denied");
    require(balance[msg.sender].lastDate == 0, "user already registered");
    balance[msg.sender].lastDate = getCurrentDay();
    blueAvatar.mint(msg.sender);
  }

  function getCurrentDay() public view returns (uint256) {
    return block.timestamp - (block.timestamp % day);
  }

  function claimBlueToken() external {
    require(balance[msg.sender].lastDate > 0, "user not registered");

    uint256 latest = getCurrentDay();
    if (balance[msg.sender].lastDate >= latest) {
      require (balance[msg.sender].total < maxPerDay, "already claimed max today");
      balance[msg.sender].total++;
    }
    else {
      balance[msg.sender].lastDate = latest;
      balance[msg.sender].total = 1;
    }

    blue20.mint(msg.sender);
  }
}