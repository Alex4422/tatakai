import marketplace from "../../../contracts/Marketplace.json";

const MarketplaceInstance = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = marketplace.networks[networkId];
  const instance = new web3.eth.Contract(
    marketplace.abi,
    deployedNetwork && deployedNetwork.address
  );
  return instance
}


export default MarketplaceInstance
