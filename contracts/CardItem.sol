// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/utils/Counters.sol";

contract CardItem is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public tokenCounter;

    struct TokenInfo {
        string metaDataHash;
        string metaData;
        uint256 count;
    }

    mapping (uint256 => TokenInfo) public tokenInfoMap;
    mapping(string => uint8) hashes;

    constructor (string memory _name, string memory _symbol, string memory _baseUri) public ERC721(_name, _symbol) {
         tokenCounter = 0;
    }

    function mintNFT(address _marketplace, string memory hash, string memory metadata) public returns (uint256) {
        require(hashes[hash] != 1);
        hashes[hash] = 1;
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(_marketplace, newItemId);
        _setTokenURI(newItemId, metadata);
        
        tokenCounter = tokenCounter + 1;
        
        tokenInfoMap[newItemId] = TokenInfo({
            metaDataHash: hash,
            metaData: metadata,
            count : tokenCounter
        });
     
        return newItemId;
    }
}
