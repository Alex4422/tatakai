// const db = require("../models");
const instance = require("../lib/web3");
const uploadFile = require("../middleware/upload");
const web3 = instance.web3;
const contract = instance.contract;
const FormData = require("form-data");const axios = require("axios");
const fs = require("fs");
const pinataApi = require("../config/pinata.config.js");

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
          "name": req.body.name
      },
      "pinataContent": {
          "name": req.body.name,
          "description": req.body.description,
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
    const item = await lms.mintNFT(accounts[0], nft_json.data.IpfsHash, {from: accounts[0]});
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
    const nft_count = await lms._tokenIds();
    let all_nfts = [];
    for (let i = 0; i < nft_count; i++) {
      const nft = await lms.tokenInfoMap(i);
      if(nft.ipfsHash !== "") {
        const info = await axios.get("https://ipfs.io/ipfs/"+nft.ipfsHash);
        // const url = `https://api.pinata.cloud/data/pinList?hashContains=${nft.ipfsHash}`;
        // const nft_info = await axios.get(url, {
        //   headers: {
        //   pinata_api_key: pinataApi.key, 
        //   pinata_secret_api_key: pinataApi.secretKey,
        //   },
        // });
        all_nfts.push({
          id: i,
          owner: nft.owner,
          name: info.data.name,
          description: info.data.description,
          image: info.data.image
        });
      }
    }
    res.status(200).send(all_nfts);
  }
  catch (err) {
    res.status(500).send({
      error: err
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const lms = await contract.deployed();
    const nft = await lms.tokenInfoMap(id);
      if(nft.ipfsHash !== "") {
        const info = await axios.get("https://ipfs.io/ipfs/"+nft.ipfsHash);
        const nft_info = {
          owner: nft.owner,
          name: info.data.name,
          description: info.data.description,
          image: info.data.image
        };
        res.status(200).send(nft_info);
      }
  }
  catch (err) {
    res.status(500).send({
      error: err
    });
  }
};