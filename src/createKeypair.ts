import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { readFileSync, writeFileSync } from "fs";

// Function to generate a new keypair
function createKeypair(): Keypair {
  const keypair = Keypair.generate();
  return keypair;
}

// Main function
function main() {
  console.log("Generating new Solana keypair...\n");

  const keypair = createKeypair();

  console.log("✓ Keypair generated!\n");
  console.log("Public Key (address):");
  console.log(keypair.publicKey.toString());
  console.log("\nPrivate Key (Base58 - add this to your .env file):");
  console.log(bs58.encode(keypair.secretKey));

  // Optionally save to file
  const keypairPath = "keypair.json";
  const jsonKeypair = Array.from(keypair.secretKey);
  
  writeFileSync(keypairPath, JSON.stringify(jsonKeypair));
  console.log(`\n✓ Keypair saved to ${keypairPath}`);

  console.log("\n⚠️  WARNING: Keep your private key secure!");
  console.log("Add the private key to your .env file as PRIVATE_KEY");
}

main();

