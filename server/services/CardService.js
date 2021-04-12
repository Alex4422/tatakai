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
                    name: data.name,
                    keyvalues: data
              },
                pinataContent: {
                    name: data.name,
                    description: data.type,
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
            const item = await this.CardItemContract.mintNFT(nft_json.data.IpfsHash, {from: accounts[0]});
            const nft_minted = await this.CardItemContract.tokenInfoMap(item.receipt.logs[0].args.tokenId);
            
            const json = {
                id: item.receipt.logs[0].args.tokenId,  
                owner: nft_minted.owner,
                ipfsHash: nft_minted.ipfsHash
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
            for (let i = 1; i <= nft_count.toNumber(); i++) {
                const owner = await this.CardItemContract.ownerOf(i);
                const ipfsHash = await this.CardItemContract.tokenURI(i);
                if(ipfsHash !== "") {
                    const url = `https://api.pinata.cloud/data/pinList?metadata[keyvalues][isForSale]={"value":"1", "op":"eq"}`;
        
                    const nft_info = await axios.get(url, {
                        headers: {
                            pinata_api_key: process.env.PINATA_KEY, 
                            pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
                        },
                    });
                    if(nft_info.data.rows[0].ipfs_pin_hash == ipfsHash) {
                        const info = await axios.get("https://ipfs.io/ipfs/"+ipfsHash);
                        all_nfts.push({
                            id: i,
                            owner: owner,
                            name: info.data.name,
                            description: info.data.description,
                            image: info.data.image,
                            metadata: nft_info.data.rows[0].metadata.keyvalues || null
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
                    metadata: nft_info.data.rows[0] !== undefined ? nft_info.data.rows[0].metadata.keyvalues : null
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
                    owner,
                    name: info.data.name,
                    description: info.data.description,
                    image: info.data.image,
                    metadata: nft_extra.data.rows[0].metadata.keyvalues || null

                };
                return nft_info;
            }
        }
        catch (err) {
            return err;
        }
    }

    async buyFrom(buyer, id) {
      try {
            const card = await this.getById(id);
            const hash = await this.CardItemContract.tokenURI(id);
            const marketplaceAddress = await this.CardItemContract.marketplace();
            await this.TakTokenContract.approve(marketplaceAddress, card.metadata.price, {from: buyer});
            await this.MarketplaceContract.buy(this.CardItemContract.address, id, card.metadata.price, {from: buyer})
            const url = `https://api.pinata.cloud/data/pinList?hashContains=${hash}`;
            const nft_info = await axios.get(url, {
                    headers: {
                        pinata_api_key: process.env.PINATA_KEY, 
                        pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
                    },
            });

            const metadata = {
                ipfsPinHash: hash,
                name: nft_info.data.rows[0].metadata.name,
                keyvalues: {...nft_info.data.rows[0].metadata.keyvalues, isForSale: 0}
            };

            const url2 = `https://api.pinata.cloud/pinning/hashMetadata`;
            const response = await axios.put(url2, metadata, {
                    headers: {
                        pinata_api_key: process.env.PINATA_KEY, 
                        pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
                    },
            });
            return true;
      } catch (error) {
            return error;
      }
    }

    async createOrder(id, price) {
        try {
            const hash = await this.CardItemContract.tokenURI(id);
            const url = `https://api.pinata.cloud/data/pinList?hashContains=${hash}`;
            const nft_info = await axios.get(url, {
                    headers: {
                        pinata_api_key: process.env.PINATA_KEY, 
                        pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
                    },
            });

            const metadata = {
                ipfsPinHash: hash,
                name: nft_info.data.rows[0].metadata.name,
                keyvalues: {...nft_info.data.rows[0].metadata.keyvalues, price, isForSale: 1}
            };

            const url2 = `https://api.pinata.cloud/pinning/hashMetadata`;
            const response = await axios.put(url2, metadata, {
                    headers: {
                        pinata_api_key: process.env.PINATA_KEY, 
                        pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
                    },
            });

            return 'Your card is now for sale.';
            
        } catch (error) {
            return error;
        }
    }
}

module.exports = (async () => {
    return await new CardService();
})();