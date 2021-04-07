const instance = require("../lib/web3");
const web3 = instance.web3;
const contract = instance.contract;
const axios = require("axios");
const fs = require("fs");
const pinataApi = require("../config/pinata.config.js");

module.exports = class CardService {
    static async getByAddress(address) {
        try {
            const lms = await contract.deployed();
            const nft_count = await lms._tokenIds();
            let all_nfts = [];
            for (let i = 1; i <= nft_count; i++) {
            const owner = await lms.ownerOf(i);
            const ipfsHash = await lms.tokenURI(i);
            if(ipfsHash !== "" && address == owner) {
                const info = await axios.get("https://ipfs.io/ipfs/"+ipfsHash);
                const url = `https://api.pinata.cloud/data/pinList?hashContains=${ipfsHash}`;
                const nft_info = await axios.get(url, {
                headers: {
                    pinata_api_key: pinataApi.key, 
                    pinata_secret_api_key: pinataApi.secretKey,
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

    static async getById(id) {
        try {
            const lms = await contract.deployed();
            const owner = await lms.ownerOf(id);
            const ipfsHash = await lms.tokenURI(id);
            if(owner) {
                const info = await axios.get("https://ipfs.io/ipfs/"+ipfsHash);
                const url = `https://api.pinata.cloud/data/pinList?hashContains=${ipfsHash}`;
                const nft_extra = await axios.get(url, {
                    headers: {
                        pinata_api_key: pinataApi.key, 
                        pinata_secret_api_key: pinataApi.secretKey,
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

    static async buyFrom(buyer, id) {
      try {
            const card = await CardService.getById(id);
            const lms = await contract.deployed();
            const lms2 = await instance.taktoken.deployed();
            const lms3 = await instance.marketplace.deployed();
            const marketplace = await lms.marketplace();
            const approve = await lms2.approve(marketplace, card.metadata.price, {from: buyer});
            await lms3.buy(lms.address, buyer, id, card.metadata.price, {from: buyer})
            const new_card = await CardService.getById(id);
            return new_card;
      } catch (error) {
            return error;
      }
    }
}