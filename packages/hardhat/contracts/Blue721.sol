// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./IBlue721.sol";
struct AvatarProps {
    // uint8 background; // 7
    // uint8 hairLower; // 21
    // uint8 body; // 4
    // uint8 eyes; // 29
    // uint8 mouth; // 20
    // uint8 socks; // 17
    // uint8 shoes; // 6
    // uint8 gloves; // 8
    // uint8 pants; // 6
    // uint8 top; // 18
    // uint8 hair; // 33
    // uint8 wings // 7
    // uint8 cape; // 7
    // uint8 capeback; // 9
    uint256 stats; //28 digit number
    uint256 tones1;
    // "eyesTone":"bdc671";
    // "eyesTone2":"4f85a9";
    // "maskTone":"635614";
    // "hairTone":"6751f6";
    // "hairTone2":"186258";
    // "underwearTone":"06bd71";
    // "underwearTone2":"04ca22";
    // "pantsTone":"4c92ba";
    // "pantsTone2":"d9a238";
    // "topTone":"26de1b";

    uint256 tones2;
    // "topTone2":"b07104";
    // "wingsTone":"39d505";
    // "wingsTone2":"8ddd9e";
    // "shoesTone":"4d8dc0";
    // "socksTone":"c4dbe8";
    // "socksTone2":"dca18d";
    // "glovesTone":"7df024";
    // "glovesTone2":"a3b5f9";
    // "hatTone":"91d6ff";
    // "hatTone2":"f6008b";

    uint256 tones3;
    // "capeTone":"8aa664";
    // "capeTone2":"3262c3";
    // "beltTone":"b5c522";
    // "jacketTone":"5ad965";
    // "jacketTone2":"923dad";
    // "neckTone":"027e49";
    // "neckTone2":"ca5581"
}

contract Blue721 is ERC721, Ownable, IBlue721 {
    using Counters for Counters.Counter;

    Counters.Counter public currentId;

    // these are the fixed values for our random
    uint256[14] private LIMITS = [
        uint256(21),
        7,
        4,
        29,
        20,
        17,
        6,
        8,
        6,
        18,
        33,
        7,
        7,
        9
    ];

    mapping(uint256 => AvatarProps) public props;

    event AvatarCreated(address owner, uint256 tokenId, AvatarProps created);

    constructor() ERC721("BLUE", "BLUE") {
        currentId.increment(); // increase counter by 1 to start at pos 1
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://blue-api.netlify.app/api/metadata/nfts/";
    }

    // updates can be made only by BlueAvatar
    // statId is 1 based, value is 1 based
    function update(
        uint256 tokenId,
        uint256 statId,
        uint256 value
    ) external onlyOwner returns (uint256) {
        require(currentId.current() > tokenId, "Invalid token Id");
        require(LIMITS.length >= statId && statId >= 0, "Invalid stats Id");
        require(LIMITS[statId] >= value, "Invalid stats Value");

        // figure out the position, math it out and then set the new value
        uint256 stats = props[tokenId].stats;
        uint256 idx1 = stats / 100**(LIMITS.length - statId);
        uint256 idx2 = stats / 100**(LIMITS.length - statId + 1);
        uint256 res = (idx2 * 100 + value) * 100**(LIMITS.length - statId);

        res = res + (stats - idx1 * 100**(LIMITS.length - statId));
        props[tokenId].stats = res;

        return res;
    }

    function getProps(uint256 tokenId)
        external
        view
        returns (AvatarProps memory _prop)
    {
        _prop = props[tokenId];
    }

    // note: i'm randomising attributes that don't have any particular
    // intrinsic value. todo: fix to include vrf if required

    function createRandom(uint256 number, uint256 seed)
        public
        view
        returns (uint256)
    {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        blockhash(block.number - 1),
                        block.timestamp,
                        msg.sender,
                        seed
                    )
                )
            ) % number;
    }

    function generateFeatures() public view returns (uint256 randomised) {
        for (uint256 i = 0; i < LIMITS.length; ++i) {
            randomised = randomised * 100 + createRandom(LIMITS[i], i) + 1;
        }
    }

    function generateTone(uint256 limit, uint256 seed)
        public
        view
        returns (uint256 tone)
    {
        tone += createRandom(16777216, seed);
        for (uint256 i = 1; i < limit; ++i) {
            tone = tone << 24;
            tone += createRandom(16777216, i + seed);
        }
    }

    function generateTones() public view returns (uint256[3] memory tones) {
        tones[0] = generateTone(10, 1);
        tones[1] = generateTone(10, 100);
        tones[2] = generateTone(7, 1000);
    }

    function mint(address _owner) external override onlyOwner {
        // generate 12 random numbers left shift by 10 as each digit represents a property
        _safeMint(_owner, currentId.current());

        uint256 randomised = generateFeatures();

        uint256[3] memory tones = generateTones();

        props[currentId.current()] = AvatarProps(
            randomised,
            tones[0],
            tones[1],
            tones[2]
        );

        emit AvatarCreated(
            _owner,
            currentId.current(),
            props[currentId.current()]
        );

        currentId.increment(); // increase by 1
    }
}
