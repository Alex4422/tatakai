# [Marketplace](https://github.com/lorcannrauzduel/tatakai/blob/main/contracts/Marketplace.sol)
This contract manages everything related to the purchase/sell and price of NFT
# Events
## 🔗 BuyTransaction
Emitted when NFT is buyed.
### Properties
- `uint256 assetId`
- `address oldOwner`
- `address newOwner`
- `uint256 price`
# Modifiers
## 🔗 `onlyNFTOwner(address _nftAddress, uint256 _assetId)`
Throws if called by any account other than the NFT owner.

# Constructor

## 🔗 `constructor(address _acceptedToken)`
Initializes the contract by setting a ERC20 token instance.

# Functions
## 🔗 `receive()`
Swap ETH to ERC20 token.

## 🔗 `buy(address _nftAddress, uint256 _assetId)`
Buy a NFT  

## 🔗 `mintNFT(string _tokenURI, uint256 _priceBase)`
Mint a new NFT  

## 🔗 `putOnSale(address _nftAddress, uint256 _assetId, uint256 _amount)`
Set a NFT price 

## 🔗 `removeOnSale(address _nftAddress, uint256 _assetId)`
remove NFT on sale
