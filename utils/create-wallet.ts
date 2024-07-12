import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import crypto from "crypto-js";

export default async function createWallet(password: string) {
  const mnemonic = generateMnemonic();
  const seed = await mnemonicToSeed(mnemonic, password);
  const keypairFromSeed = Keypair.fromSeed(seed.subarray(0, 32));
  const encryptedKeypairData = crypto.AES.encrypt(
    JSON.stringify(keypairFromSeed),
    password
  ).toString();

  return {
    mnemonic,
    encryptedKeypairData,
  };
}
