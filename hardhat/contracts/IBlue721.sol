// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IBlue721 is IERC721 {
    enum Slots {
        BACKGROUND,
        HAIRLOWER,
        BODY,
        EYES,
        MOUTH,
        SOCKS,
        SHOES,
        GLOVES,
        PANTS,
        TOP,
        HAIR,
        WINGS,
        CAPE,
        CAPEBACK
    }

    function update(
        uint256 tokenId,
        uint256 statId,
        uint256 value
    ) external returns (uint256);

    function mint(address _owner) external;
}