var TakToken = artifacts.require("TakToken");
var Marketplace = artifacts.require("Marketplace");
var CardItem = artifacts.require("CardItem");
var Faucet = artifacts.require("Faucet");

module.exports = async (deployer) => {
  await deployer.deploy(TakToken, "Tatakai", "TAK");
  const token = await TakToken.deployed();
  
  await deployer.deploy(Marketplace, TakToken.address);
  const marketplace = await Marketplace.deployed();
  
  await deployer.deploy(Faucet, TakToken.address);
  const faucet = await Faucet.deployed();
  
  await token.transfer(marketplace.address, "500000000000000000");
  await token.transfer(faucet.address, "500000000000000000");
  
  await deployer.deploy(CardItem, "TatakaiCard", "TAKCARD", Marketplace.address);

};
