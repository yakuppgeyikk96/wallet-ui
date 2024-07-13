import { Keypair } from "@solana/web3.js";
import { mnemonicToSeed, validateMnemonic } from "bip39";
import crypto from "crypto-js";

export default async function importWallet(mnemonic: string, password: string) {
  if (!validateMnemonic(mnemonic.trim())) {
    throw new Error("Invalid mnemonic");
  }

  const seed = await mnemonicToSeed(mnemonic);
  const keypairFromSeed = Keypair.fromSeed(seed.subarray(0, 32));
  const encryptedKeypairData = crypto.AES.encrypt(
    JSON.stringify(keypairFromSeed),
    password
  ).toString();
  const encryptedPasswordData = crypto.AES.encrypt(
    password,
    process.env.NEXT_PUBLIC_SESSION_STORAGE_ENCRYPTION_KEY || ""
  ).toString();

  return { encryptedKeypairData, encryptedPasswordData };
}
