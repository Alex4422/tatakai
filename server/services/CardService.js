require('dotenv').config();
const FormData = require("form-data");
const axios = require("axios");
const fs = require("fs");
const Service = require('./Service');

class CardService extends Service {
    constructor() {
        super();
    }
    
    async mint(image, data) {
        try {
            let image_data = new FormData();
            image_data.append("file", fs.createReadStream(image.path));  
            
            const nft = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", image_data, {
                maxContentLength: "Infinity", 
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${image_data._boundary}`,
                    pinata_api_key: process.env.PINATA_KEY, 
                    pinata_secret_api_key: process.env.PINATA_SECRET_KEY
                },
            });
        
            const metadata = {
                pinataMetadata: {
                    name: data.metadata.name,
                    keyvalues: data.metadata
              },
                pinataContent: {
                    name: data.metadata.name,
                    description: data.metadata.type,
                    image: "https://ipfs.io/ipfs/"+nft.data.IpfsHash
              }
            };
        
            const nft_json = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", metadata, {
                headers: {
                    pinata_api_key: process.env.PINATA_KEY, 
                    pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
                },
            });
            
            const accounts = await this.web3.eth.getAccounts();
            const item = await this.CardItemContract.mintNFT(nft_json.data.IpfsHash, data.price, {
                from: accounts[0],
                gasPrice: 5000000000,
            });
            const id = item.receipt.logs[0].args.tokenId;
            await this.CardItemContract.approve(this.MarketplaceContract.address, id, {from: accounts[0]});
            const owner = await this.CardItemContract.ownerOf(id);
            const ipfsHash = await this.CardItemContract.tokenURI(id);
            
            const json = {
                id,
                owner,
                ipfsHash
            };
            
            return json;
            
        } catch (error) {
            return error;
        }
    }

    async getOnSale() {
        try {
            const nft_count = await this.CardItemContract._tokenIds();
            let all_nfts = [];
            for (let i = 1; i <= nft_count; i++) {
            const owner = await this.CardItemContract.ownerOf(i);
            const ipfsHash = await this.CardItemContract.tokenURI(i);
            const contract_info = await this.CardItemContract.tokens(i);
            if(ipfsHash !== "") {
                const info = await axios.get("https://ipfs.io/ipfs/"+ipfsHash);
                const url = `https://api.pinata.cloud/data/pinList?hashContains=${ipfsHash}`;
                const nft_info = await axios.get(url, {
                    headers: {
                        pinata_api_key: process.env.PINATA_KEY, 
                        pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
                    },
                });
                if(contract_info.isForSale) {
                    all_nfts.push({
                        id: i,
                        ipfsHash,
                        owner: owner,
                        name: info.data.name,
                        description: info.data.description,
                        image: info.data.image,
                        price: parseInt(contract_info.price, 10),
                        isForSale: contract_info.isForSale,
                        metadata: nft_info.data.rows[0] !== undefined ? nft_info.data.rows[0].metadata.keyvalues : null
                    });
                }
            }
            }
            return all_nfts;
        }
        catch (err) {
            return err;
        }
    }
    
    async getByAddress(address) {
        try {
            const nft_count = await this.CardItemContract._tokenIds();
            let all_nfts = [];
            for (let i = 1; i <= nft_count; i++) {
            const owner = await this.CardItemContract.ownerOf(i);
            const ipfsHash = await this.CardItemContract.tokenURI(i);
            if(ipfsHash !== "" && address == owner) {
                const info = await axios.get("https://ipfs.io/ipfs/"+ipfsHash);
                const url = `https://api.pinata.cloud/data/pinList?hashContains=${ipfsHash}`;
                const contract_info = await this.CardItemContract.tokens(i);
                const nft_info = await axios.get(url, {
                    headers: {
                        pinata_api_key: process.env.PINATA_KEY, 
                        pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
                    },
                });
                all_nfts.push({
                    id: i,
                    owner: owner,
                    name: info.data.name,
                    description: info.data.description,
                    image: info.data.image,
                    price: parseInt(contract_info.price, 10),
                    isForSale: contract_info.isForSale,
                    metadata: nft_info.data.rows[0].metadata.keyvalues || null
                });
            }
            }
            return all_nfts;
        }
        catch (err) {
            return err;
        }
    }

    async getById(id) {
        try {
            const owner = await this.CardItemContract.ownerOf(id);
            const ipfsHash = await this.CardItemContract.tokenURI(id);
            if(owner) {
                const contract_info = await this.CardItemContract.tokens(id);
                const info = await axios.get("https://ipfs.io/ipfs/"+ipfsHash);
                const url = `https://api.pinata.cloud/data/pinList?hashContains=${ipfsHash}`;
                const nft_extra = await axios.get(url, {
                    headers: {
                        pinata_api_key: process.env.PINATA_KEY, 
                        pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
                    },
                });
                const nft_info = {
                    id,
                    ipfsHash,
                    owner,
                    name: info.data.name,
                    description: info.data.description,
                    image: info.data.image,
                    price: contract_info.price,
                    isForSale: contract_info.isForSale,
                    metadata: nft_extra.data.rows[0].metadata.keyvalues || null

                };
                return nft_info;
            }
        }
        catch (err) {
            return err;
        }
    }
}

module.exports = (async () => {
    return await new CardService();
})();