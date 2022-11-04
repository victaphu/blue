// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

import "./IBlue1155.sol";
import "./IBlue721.sol";
import "./IBlueAvatar.sol";

contract BlueAvatar is Ownable, IERC1155Receiver, IBlueAvatar {
  IBlue721 public blueNFT;
  IBlue1155 public blueAccessories;

  // blue nft id to active slots + previous token id that was equipped
  mapping (uint256 => mapping(IBlue721.Slots => uint256)) activeSlots;

  event Equipped(address owner, uint256 avatarId, uint256 tokenId, uint256 updatedStats);
  event UnEquipped(address owner, uint256 avatarId, uint256 tokenId, uint256 updatedStats);  

  constructor(IBlue721 _blueNFT, IBlue1155 _blueAccessories) {
    require(address(_blueNFT) != address(0), "invalid nft address");
    require(address(_blueAccessories) != address(0), "invalid accessory address");
    blueNFT = _blueNFT;
    blueAccessories = _blueAccessories;
  }

  function _unequip(uint256 nftId, uint256 tokenId) private returns (uint256 slotId) {
    slotId = blueAccessories.getSlot(tokenId);
    if (activeSlots[nftId][IBlue721.Slots(slotId)] > 0) {
      // transfer blue accessories back to the owner of this NFT
      blueAccessories.safeTransferFrom(address(this), msg.sender, activeSlots[nftId][IBlue721.Slots(slotId)], 1, "");
    }
  }
  
  function equip(uint256 nftId, uint256 tokenId) external override {
    // must own at least one of blue1155
    // transfer ownership of (1) tokenId to this contract and equip the nft
    require (blueNFT.ownerOf(nftId) == msg.sender, 'Not owner');
    require (blueAccessories.balanceOf(msg.sender, tokenId) > 0, 'Does not own Accessory');

    // unequip slot
    uint256 slotId = _unequip(nftId, tokenId);

    blueAccessories.safeTransferFrom(msg.sender, address(this), tokenId, 1, "");
    activeSlots[nftId][IBlue721.Slots(slotId)] = tokenId; // slot now used by new token id

    // equip new slot
    uint256 updatedStats = blueNFT.update(nftId, slotId, blueAccessories.getAccessoryId(tokenId));
    emit Equipped(msg.sender, nftId, tokenId, updatedStats);
  }

  function unequip(uint256 nftId, uint256 tokenId) external override {
    // must have equipped
    // will transfer ownership of tokenId back to owner of the avatar
    require (blueNFT.ownerOf(nftId) == msg.sender, 'Not owner');
    uint256 slotId = _unequip(nftId, tokenId);
    activeSlots[nftId][IBlue721.Slots(slotId)] = 0;
    uint256 updatedStats = blueNFT.update(nftId, slotId, 0);
    
    emit UnEquipped(msg.sender, nftId, tokenId, updatedStats);
  }
  
  function mint(address _holder) external override onlyOwner {
    blueNFT.mint(_holder);
  }

  function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external returns (bytes4) {
      return 0xf23a6e61;
    }

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) external returns (bytes4) {
      return 0xbc197c81;
    }

    function supportsInterface(bytes4 interfaceId) external view returns (bool) {
      return true;
    }
}