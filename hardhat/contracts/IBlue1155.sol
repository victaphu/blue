// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

interface IBlue1155 is IERC1155 {
  function getSlot(uint256 tokenId) external returns(uint256 slot);
  function getAccessoryId(uint256 tokenId) external returns(uint256 accessoryId);
}