// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IBlueAvatar {
  function equip(uint256 nftId, uint256 tokenId) external;
  function unequip(uint256 nftId, uint256 tokenId) external;
  function mint(address _holder) external;
}