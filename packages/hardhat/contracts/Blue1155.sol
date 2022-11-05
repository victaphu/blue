// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./IBlue1155.sol";

contract Blue1155 is ERC1155, IBlue1155, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public currentId;
    IERC20 public blue20;
    address public tokenReceiver;

    event AccessoryPurchased(uint256 tokenId, AccessoryDetails details, address owner);

    struct AccessoryDetails {
        uint256 slotId;
        uint256 accessoryId;
    }

    mapping(uint256 => AccessoryDetails) public details;

    modifier ValidArgs(uint256 slotId, uint256 accessoryId) {
        require(slotId > 0, "invalid slot id");
        require(accessoryId > 0, "invalid accessory id");
        _;
    }

    constructor(IERC20 _blue20, address _tokenReceiver)
        ERC1155("https://blue-api.netlify.app/api/metadata/accessories/{id}")
    {
        require(_tokenReceiver != address(0), "invalid token receiver");
        require(address(_blue20) != address(0), "invalid blue20");
        blue20 = _blue20;
        tokenReceiver = _tokenReceiver;
    }

    function getAccessory(uint256 tokenId) external view returns (AccessoryDetails memory) {
        return details[tokenId];
    }

    function getSlot(uint256 tokenId) external virtual returns (uint256 slot) {
        return details[tokenId].slotId;
    }

    function getAccessoryId(uint256 tokenId)
        external
        virtual
        returns (uint256 accessoryId)
    {
        return details[tokenId].accessoryId;
    }

    function buy(uint256 tokenId) external {
        require(details[tokenId].slotId > 0, "token does not exist"); // we can't mint new stuff as a user but we can buy tokens already existing

        // send this to the token receiver. this should be a splitter!
        blue20.transferFrom(msg.sender, tokenReceiver, 2); // you must approve transfer of tokens to the blue20 token; cost 2 per token (brush for 1 day and start playing)

        _mint(msg.sender, tokenId, 1, ""); // purchased 1 token; these tokens keep growing in balance forever
        emit AccessoryPurchased(tokenId, details[tokenId], msg.sender);
    }

    function mint(uint256 slotId, uint256 accessoryId)
        external
        onlyOwner
        ValidArgs(slotId, accessoryId)
    {
        currentId.increment();
        _mint(msg.sender, currentId.current(), 1, "");
        details[currentId.current()] = AccessoryDetails(slotId, accessoryId);
    }

    function mintBatch(
        uint256 slotId,
        uint256[] memory accessoryIds,
        uint256 total
    ) external onlyOwner ValidArgs(slotId, 1) {
        currentId.increment(); // known bug - should increment this at a different place (kept because the rest of the system works around this bug)
        uint256 start = currentId.current();
        uint256[] memory ids = new uint256[](total);
        uint256[] memory amounts = new uint256[](total);
        for (; currentId.current() < start + total; currentId.increment()) {
            uint256 i = currentId.current() - start;
            ids[i] = (currentId.current());
            amounts[currentId.current() - start] = 1;
            require(accessoryIds[i] > 0, "invalid accesory id");
            details[currentId.current()] = AccessoryDetails(
                slotId,
                accessoryIds[i]
            );
        }
        _mintBatch(msg.sender, ids, amounts, "");
    }
}
