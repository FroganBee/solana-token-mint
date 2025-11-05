# Solana Token Mint

A TypeScript project to mint tokens on Solana devnet.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Solana wallet with SOL for transaction fees (you can get free SOL from [faucets](https://faucet.solana.com/))

## Installation

```bash
npm install
```

## Setup

1. Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your credentials:

**Getting your private key from a Solana wallet:**

If you have a Phantom or other wallet, you can export your private key. Alternatively, you can generate a new keypair using the Solana CLI:

```bash
solana-keygen new --outfile keypair.json
solana-keygen pubkey keypair.json
```

Then convert your keypair to Base58 format for the `.env` file. You can create a simple script or use an online tool.

**For testing purposes**, you can also create a new keypair programmatically. I've included a script to help with this in `src/createKeypair.ts`.

## Usage

### Development mode (with tsx)
```bash
npm run dev
```

### Build and run
```bash
npm run build
npm start
```

## Project Structure

```
solana-token-mint/
├── src/
│   ├── index.ts          # Main token minting script
│   └── createKeypair.ts  # Helper script to generate new keypair
├── dist/                 # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables

- `PRIVATE_KEY`: Your wallet private key in Base58 format
- `RPC_ENDPOINT`: Optional custom RPC endpoint (defaults to devnet)
- `TOKEN_NAME`: Name of your token
- `TOKEN_SYMBOL`: Symbol of your token
- `TOKEN_DECIMALS`: Number of decimals (default: 9)

## Features

- Creates a new SPL token mint on Solana devnet
- Creates an associated token account
- Mints tokens to your wallet
- Displays all relevant token information
- Provides Solana Explorer links

## Getting Free SOL for Devnet

Visit https://faucet.solana.com/ and enter your wallet address to get free SOL for testing.

## Notes

- This project uses Solana devnet for testing. Do not use real SOL or mainnet credentials.
- Keep your private keys secure and never commit them to version control.
- The default mint amount is 1,000,000 tokens with 9 decimals.

## Resources

- [Solana Documentation](https://docs.solana.com/)
- [SPL Token Documentation](https://spl.solana.com/token)
- [Solana Explorer](https://explorer.solana.com/)
- [Solana Devnet Faucet](https://faucet.solana.com/)

