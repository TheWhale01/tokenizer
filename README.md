# Tokenizer

This project is the first project of the web3 branch in the 42 cursus. This is about creating and publishing a token on a blockchain of your choice. 

## Languages - TS + Solidity

For the languages I chose Typescript and Solidity with [hardhat](https://hardhat.org/).

- **Solidity:** Is the industry standard to write the smart contract representing the token itself
- **Typescript:** Is it used here to deploy the token on a specific blockchain using the [hardhat](https://hardhat.org/). framework. It is also the industry standard and has the best and most detailed documentation out there.

## Blockchain - BNB Smart Chain (BSC)

There is a wide variety of blockchains with their own advantages and incovenients. I chose **BSC** because it is fast, very reliable, and allows for rapid prototyping which is perfect in our case.

## How to get started:

### Setting up the environment

First all all you'll need to create a `.env` file where you'll store your wallet private key and the blockchain api token

```bash
touch code/.env
```

Now in the `code/.env` file you'll have something like:

```env
PRIVATE_KEY=your-super-secret-wallet-private-key
BSCSCAN_API_KEY=your-super-secret-bnbchain-api-key
```

### Deploying the token

from the root of the repository:

```bash
make deploy
```

> __*NOTE:*__ This operation can take some time to finish.

### Verifying the deployment
