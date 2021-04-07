// const db = require("../models");
const instance = require("../lib/web3");
const uploadFile = require("../middleware/upload");
const web3 = instance.web3;
const contract = instance.contract;
const FormData = require("form-data");const axios = require("axios");
const fs = require("fs");
const pinataApi = require("../config/pinata.config.js");
const CardService = require("../services/card.services");

exports.create = async (req, res) => {
  try {
    const lms = await contract.deployed();
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();
    data.append("file", fs.createReadStream(req.file.path));  

    const nft = await axios.post(url, data, {
        maxContentLength: "Infinity", 
        headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApi.key, 
        pinata_secret_api_key: pinataApi.secretKey,
        },
    });

    const metadata = {
      "pinataMetadata": {
          "name": req.body.name || "",
          "keyvalues": {
            "name": req.body.name || "",
            "age": req.body.age || "",
            "nationality": req.body.nationality || "",
            "saison": req.body.saison || "",
            "type": req.body.type || "",
            "price": req.body.price || 1
          }
      },
      "pinataContent": {
          "name": req.body.name || "",
          "description": req.body.type || "",
          "image": "https://ipfs.io/ipfs/"+nft.data.IpfsHash
      }
    };

    const nft_json = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", metadata, {
        headers: {
        pinata_api_key: pinataApi.key, 
        pinata_secret_api_key: pinataApi.secretKey,
        },
    });

    const accounts = await web3.eth.getAccounts();
    const item = await lms.mintNFT(nft_json.data.IpfsHash, {from: accounts[0]});
    const nft_minted = await lms.tokenInfoMap(item.receipt.logs[0].args.tokenId) 
    res.status(200).send({
      id: item.receipt.logs[0].args.tokenId,  
      owner: nft_minted.owner,
      ipfsHash: nft_minted.ipfsHash
    }); 
    
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
};

exports.findAll = async (req, res) => {
     try {
        const lms = await contract.deployed();
        const marketplace = await lms.marketplace();
        const cards = await CardService.getByAddress(marketplace);
        if(!cards){
            res.status(404).json({error: "There are no cards minted yet!"})
        }
        res.json(cards);
      } catch (error) {
          res.status(500).json({error: error})
      }
};

exports.findOne = async (req, res) => {
      try {
        const id = req.params.id;
        const card = await CardService.getById(id);
        if(!card){
            res.status(404).json({error: "No exists!"})
        }
        res.json(card);
      } catch (error) {
          res.status(500).json({error: error})
      }
};

exports.buy = async (req, res) => {
      try {
          const id = req.body.id;
          const buyer = req.body.address;
          const card = await CardService.buyFrom(buyer, id); 
          res.json(card);
      } catch (error) {
          res.status(500).json({error: error})
      }
};