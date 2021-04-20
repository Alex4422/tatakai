require('dotenv').config();
const axios = require("axios");
const Service = require('./Service');

class OrderService extends Service {
    constructor() {
        super();
    }

    async createBuyOrder(id) {
      try {
            const hash = await this.CardItemContract.tokenURI(id);
            // const marketplaceAddress = await this.CardItemContract.marketplace();
            // await this.TakTokenContract.approve(marketplaceAddress, card.metadata.price, {from: buyer});
            // await this.MarketplaceContract.buy(this.CardItemContract.address, id, card.metadata.price, {from: buyer})
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
            await axios.put(url2, metadata, {
                    headers: {
                        pinata_api_key: process.env.PINATA_KEY, 
                        pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
                    },
            });
            return metadata;
      } catch (error) {
            return error;
      }
    }

    async createSellOrder(id, price) {
        try {
            const hash = await this.CardItemContract.tokenURI(id);
            console.log(hash)
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
                keyvalues: {price, isForSale: 1}
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
    
    async removeOrder(id) {
        try {
            const hash = await this.CardItemContract.tokenURI(id);
            console.log(hash)
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
                keyvalues: {isForSale: 0}
            };

            const url2 = `https://api.pinata.cloud/pinning/hashMetadata`;
            const response = await axios.put(url2, metadata, {
                    headers: {
                        pinata_api_key: process.env.PINATA_KEY, 
                        pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
                    },
            });

            return 'You remove your card on sale.';
            
        } catch (error) {
            return error;
        }
    }
    
    async getCardOrder(id) {
        try {
            const events = await this.MarketplaceContract.events.BuyTransaction({
                fromBlock: 0
            })
            
            return events;
        } catch (error) {
            return error;
        }
    }
}

module.exports = (async () => {
    return await new OrderService();
})();