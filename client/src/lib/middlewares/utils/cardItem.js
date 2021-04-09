import CardItem from "../../../contracts/CardItem.json";

const CardItemInstance = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = CardItem.networks[networkId];
  const instance = new web3.eth.Contract(
    CardItem.abi,
    deployedNetwork && deployedNetwork.address
  );
  return instance
}


export default CardItemInstance
