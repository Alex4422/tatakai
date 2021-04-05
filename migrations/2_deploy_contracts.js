var CardItem = artifacts.require("CardItem");
var SimpleStorage = artifacts.require("SimpleStorage");

module.exports = function (deployer) {
  deployer.deploy(CardItem, "takakai", "TKAI", 1);
  deployer.deploy(SimpleStorage);
};
