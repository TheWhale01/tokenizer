# Tokenizer

This project is the first project of the web3 branch in the 42 cursus. This is about creating and publishing a token on a blockchain of your choice. 

## Languages - JS + Solidity

For the languages I chose Javascript and Solidity.

- **Solidity:** Is the industry standard to write the smart contract representing the token itself
- **Javascript:** Is it used here to deploy the token on a specific blockchain using the `Hardhat` framework. It is also the industry standard and has the best and most detailed documentation out there.

## Blockchain - BNB Smart Chain (BSC)

There is a wide variety of blockchains with their own advantages and incovenients. I chose **BSC** because it is fast, very reliable, and allows for rapid prototyping which is perfect in our case.

## How to get started:

First all all you'll need to create a `.env` file where you'll store your wallet private key and the blockchain api token

```bash
touch code/.env
```

Now in the `code/.env` file you'll have something like:

```env
PRIVATE_KEY=your-super-secret-wallet-private-key
BSCSCAN_API_KEY=your-super-secret-bnbchain-api-key
```
