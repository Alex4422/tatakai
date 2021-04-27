# [CardItem](https://github.com/lorcannrauzduel/tatakai/blob/main/contracts/CardItem.sol)
This contract manages everything related to NFT
# Events
## 🔗 ItemCreated
Emitted when NFT is minted.
### Properties
- `address owner`
- `uint256 tokenId`
# Modifiers
## 🔗 onlyMarketplace()
 Throws if called by any account other than the marketplace.

# Constructor

## 🔗 `constructor (string memory _name, string memory _symbol, address _marketplace) ERC721(_name, _symbol)`

Initializes the contract by setting a `name`, a `symbol` and the `marketplace` address that will manage the token collection.

# Data Structures
## 🔗 TokenInfo
### Properties
- `string tokenURI`
- `uint256 price`
- `bool isForSale`
# Functions
## 🔗 `setPrice(uint256 _assetId, uint256 _amount)`
Set a NFT price 

## 🔗 `updateOnSale(uint256 _assetId, bool _status)`
Update status NFT on sale

## 🔗 `mintNFT(string _tokenURI, uint256 _priceBase)`
Mint a new NFT  

## 🔗 `getPrice(uint256 _assetId)`
Get a NFT price

## 🔗 `getOnSale(uint256 _assetId)`
Get a status NFT on sale 
