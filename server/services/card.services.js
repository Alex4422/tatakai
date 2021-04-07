const instance = require("../lib/web3");
const web3 = instance.web3;
const contract = instance.contract;
const axios = require("axios");
const fs = require("fs");
const pinataApi = require("../config/pinata.config.js");

module.exports = class CardService {
    static async getCardsOf(address){
        try {
            const lms = await contract.deployed();
            const nft_count = await lms._tokenIds();
            let all_nfts = [];
            for (let i = 0; i <= nft_count; i++) {
            const nft = await lms.tokenInfoMap(i);
            if(nft.ipfsHash !== "" && address == nft.owner) {
                console.log(address);
                console.log(nft.owner);
                const info = await axios.get("https://ipfs.io/ipfs/"+nft.ipfsHash);
                const url = `https://api.pinata.cloud/data/pinList?hashContains=${nft.ipfsHash}`;
                const nft_info = await axios.get(url, {
                headers: {
                    pinata_api_key: pinataApi.key, 
                    pinata_secret_api_key: pinataApi.secretKey,
                },
                });
                all_nfts.push({
                    id: i,
                    owner: nft.owner,
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
}