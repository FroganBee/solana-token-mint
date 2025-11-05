import {
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  getMint,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import * as dotenv from "dotenv";
import bs58 from "bs58";

// Load environment variables
dotenv.config();

async function main() {
  try {
    // Parse private key from environment
    if (!process.env.PRIVATE_KEY) {
      throw new Error("PRIVATE_KEY not found in .env file");
    }

    const privateKeyArray = bs58.decode(process.env.PRIVATE_KEY);
    const payer = Keypair.fromSecretKey(privateKeyArray);

    console.log("Wallet address:", payer.publicKey.toString());

    // Connect to Solana devnet
    const connection = new Connection(
      process.env.RPC_ENDPOINT || clusterApiUrl("devnet"),
      "confirmed"
    );

    console.log("Connected to Solana devnet");

    // Get token configuration from env or use defaults
    const tokenName = process.env.TOKEN_NAME || "My Token";
    const tokenSymbol = process.env.TOKEN_SYMBOL || "MTK";
    const decimals = parseInt(process.env.TOKEN_DECIMALS || "9");

    console.log(`\nCreating token: ${tokenName} (${tokenSymbol})`);
    console.log(`Decimals: ${decimals}`);

    // Create the mint
    const mint = await createMint(
      connection,
      payer,
      payer.publicKey, // mint authority
      payer.publicKey, // freeze authority (can be null)
      decimals,
      undefined, // keypair for the mint (optional)
      undefined, // confirmation options
      TOKEN_PROGRAM_ID
    );

    console.log("\n✓ Mint created!");
    console.log("Mint address:", mint.toString());

    // Create token account for the payer
    console.log("\nCreating token account...");
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey
    );

    console.log("✓ Token account created!");
    console.log("Token account address:", tokenAccount.address.toString());

    // Mint some tokens
    console.log("\nMinting tokens...");
    const amount = 1_000_000_000 * Math.pow(10, decimals); // Mint 1 billion tokens
    const mintSignature = await mintTo(
      connection,
      payer,
      mint,
      tokenAccount.address,
      payer.publicKey,
      BigInt(amount)
    );

    console.log("✓ Tokens minted!");
    console.log("Transaction signature:", mintSignature);

    // Get mint info
    const mintInfo = await getMint(connection, mint);
    console.log("\n✓ Mint information:");
    console.log("  Supply:", mintInfo.supply.toString());
    console.log("  Decimals:", mintInfo.decimals);
    console.log("  Mint authority:", mintInfo.mintAuthority?.toString());
    console.log("  Freeze authority:", mintInfo.freezeAuthority?.toString());

    console.log("\n🎉 Token minting completed successfully!");
    console.log("\nToken details:");
    console.log("  Name:", tokenName);
    console.log("  Symbol:", tokenSymbol);
    console.log("  Mint address:", mint.toString());
    console.log("  Decimals:", decimals);
    console.log("  Your token account:", tokenAccount.address.toString());
    console.log("  Amount minted:", amount / Math.pow(10, decimals), tokenSymbol);

    // View on Solana Explorer
    const explorerUrl = `https://explorer.solana.com/address/${mint.toString()}?cluster=devnet`;
    console.log("\nView on Solana Explorer:");
    console.log(explorerUrl);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();

