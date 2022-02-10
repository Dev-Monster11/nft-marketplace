require('dotenv').config();
const NFTs = require('@primenums/solana-nft-tools');
const web3 = require("@solana/web3.js");
const { nftMetadataController } = require('../controller');

(async () => {

  // Create connection
  const conn = new web3.Connection(
    web3.clusterApiUrl('devnet'),
    'confirmed'
  );

  // Get all mint tokens (NFTs) from your wallet
  let mints = await NFTs.getMintTokensByOwner(conn, process.env.PUBLIC_STORE_OWNER_ADDRESS);
  for (const addr of mints) {
    try {

      // Now we can get some NFT information (metadata)

      const metadata = await NFTs.getNFTByMintAddress(conn, addr);
      await nftMetadataController.create(metadata)
    } catch (err) {
      console.log(err);
    }
  }

})();