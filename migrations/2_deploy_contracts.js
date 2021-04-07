var TakToken = artifacts.require("TakToken");
var Marketplace = artifacts.require("Marketplace");
var CardItem = artifacts.require("CardItem");
var Faucet = artifacts.require("Faucet");
var SimpleStorage = artifacts.require("SimpleStorage");

module.exports = async (deployer) => {
  await deployer.deploy(TakToken, 1000000000000, "Tatakai", "TAK");
  await deployer.deploy(Marketplace, TakToken.address);
  await deployer.deploy(Faucet, TakToken.address);
  await deployer.deploy(CardItem, "TatakaiCard", "TAKCARD", Marketplace.address);
};
