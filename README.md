# Decentralized NFT Minting DApp

## Overview

This decentralized application (dApp) allows users to mint, view, and transfer NFTs. The NFTs feature AI-generated images that are stored on IPFS, with metadata populated from the IPFS links. The platform is built with security and user experience in mind, implementing sequential minting and proper ownership verification.

## Features

- **Wallet Connection**: Seamless connection to Web3 wallets using Wagmi
- **NFT Minting**: Mint unique AI-generated NFTs stored on IPFS
- **Sequential Minting**: NFTs are minted in sequential order, preventing gaps in the collection
- **Ownership Verification**: Users can only mint NFTs not owned by other addresses
- **My NFTs View**: Personal gallery to view all NFTs owned by the connected wallet
- **Transfer Functionality**: Transfer your NFTs to any valid Ethereum address

## Technology Stack

- **Frontend**: React.js
- **Smart Contracts**: Solidity
- **Web3 Integration**: Wagmi
- **Storage**: IPFS for decentralized image and metadata storage
- **Styling**: Tailwind CSS v4.0.14 for utility-first styling
Radix UI Themes v3.2.1 for accessible UI components
Iconify v5.2.0 for high-quality icons

## Deployment : Project was delployed on Vercel : https://nft-dapp-x9h5.vercel.app/

## Prerequisites

- Node.js (v14.0 or later)
- NPM or Yarn
- MetaMask or another Web3 wallet
- Some testnet ETH for testing (if using a testnet)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nft-minting-dapp.git
   cd nft-minting-dapp
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_CONTRACT_ADDRESS=your_deployed_contract_address
   REACT_APP_INFURA_ID=your_infura_id
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Smart Contract

The NFT smart contract implements the ERC-721 standard with the following additional features:

- Sequential minting to ensure ordered collection
- Ownership verification to prevent unauthorized minting
- Transfer functions with proper security checks

## Usage

### Connecting Your Wallet

1. Click the "Connect Wallet" button in the top right corner
2. Select your preferred wallet (MetaMask, WalletConnect, etc.)
3. Approve the connection request in your wallet

### Minting an NFT

1. Navigate to the "Mint" page
2. Preview the AI-generated artwork available for minting
3. Click "Mint NFT" and confirm the transaction in your wallet
4. Once the transaction is confirmed, your NFT will appear in your collection

### Viewing Your NFTs

1. Navigate to the "My NFTs" page
2. All NFTs owned by your connected wallet address will be displayed
3. Click on an individual NFT to view its details

### Transferring an NFT

1. Navigate to the "My NFTs" page
2. Select the NFT you wish to transfer
3. Click the "Transfer" button
4. Enter the recipient's Ethereum address
5. Confirm the transfer transaction in your wallet

## License: UNLICENSED.
