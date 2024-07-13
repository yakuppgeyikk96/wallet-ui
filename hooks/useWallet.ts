"use client";

import { useRouter } from "next/navigation";
import useSessionStorage from "./useSessionStorage";
import useLocalStorage from "./useLocalStorage";
import decryptData from "@/utils/decrypt-data";
import parseKeypairJson from "@/utils/parse-keypair-json";
import {
  AccountInfo,
  clusterApiUrl,
  Connection,
  GetProgramAccountsResponse,
  LAMPORTS_PER_SOL,
  PublicKey,
  RpcResponseAndContext,
} from "@solana/web3.js";
import bs58 from "bs58";
import { AccountLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { programs } from "@metaplex/js";

export interface ITokenMetadata {
  name: string;
  symbol: string;
  image: string;
  description: string;
  tags: string[];
  balance: string;
  mint: PublicKey | null;
}

export default function useWallet() {
  const router = useRouter();
  const network = clusterApiUrl("devnet");
  const connection = new Connection(network, "confirmed");
  const storedPasswordKey =
    process.env.NEXT_PUBLIC_SESSION_STORAGE_KEY || "cygnus-wallet-password";
  const sessionStorageKey =
    process.env.NEXT_PUBLIC_SESSION_STORAGE_ENCRYPTION_KEY || "";
  const storedKeypairKey =
    process.env.NEXT_PUBLIC_LOCAL_STORAGE_KEY || "cygnus-wallet-keypair";

  const { value: encryptedPassword, removeValue: removePasswordValue } =
    useSessionStorage(storedPasswordKey, "");
  const { value: encryptedKeypair, removeValue: removeKeypairValue } =
    useLocalStorage(storedKeypairKey, "");

  const acquireKeypair = async () => {
    const decryptedPassword = decryptData(encryptedPassword, sessionStorageKey);
    if (decryptedPassword) {
      const decryptedKeypair = decryptData(encryptedKeypair, decryptedPassword);

      if (decryptedKeypair) {
        return {
          decryptedPassword,
          decryptedKeypair,
        };
      } else {
        console.error("Failed to decrypt keypair");
      }
    } else {
      console.error("Failed to decrypt password");
    }
  };

  const getPublicKey = async () => {
    const authData = await acquireKeypair();

    if (!authData || !authData.decryptedKeypair) {
      throw new Error("Failed to acquire keypair");
    }

    const keypairData = parseKeypairJson(authData.decryptedKeypair);

    // Fetch assets using keypair
    const bytes = Uint8Array.from(Object.values(keypairData.publicKey));
    const publicKeyStr = bs58.encode(bytes);

    const publicKey = new PublicKey(publicKeyStr);

    // const publicKey = new PublicKey(
    //   "7qtcjkvwj9YMgCYKvJzDB6iJNwEoxLhbjDQrnGmjjYff"
    // );

    return publicKey;
  };

  const getSolInfo = async (): Promise<ITokenMetadata> => {
    const publicKey = await getPublicKey();
    const solBalance = await connection.getBalance(publicKey);

    return {
      name: "Solana",
      symbol: "SOL",
      image: "/images/solana_logo.png",
      description:
        "Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale today.",
      tags: ["solana", "sol"],
      balance: (solBalance / LAMPORTS_PER_SOL).toString(),
      mint: new PublicKey("So11111111111111111111111111111111111111112"),
    };
  };

  const fetchAssets = async (): Promise<
    RpcResponseAndContext<GetProgramAccountsResponse>
  > => {
    const publicKey = await getPublicKey();

    const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
      programId: TOKEN_PROGRAM_ID,
    });

    return tokenAccounts;
  };

  const getMetadataOfToken = async (
    tokenAccount: Readonly<{
      account: AccountInfo<Buffer>;
      pubkey: PublicKey;
    }>
  ): Promise<ITokenMetadata> => {
    const data = tokenAccount.account.data;
    const parsedData = AccountLayout.decode(data);
    const mintAddress = parsedData.mint;

    const { Metadata } = programs.metadata;

    const { data: metadata } = await Metadata.findByMint(
      connection,
      mintAddress
    );

    const response = await fetch(metadata.data.uri);

    if (!response.ok) {
      throw new Error("Failed to fetch metadata");
    }

    const metadataJson = await response.json();

    return {
      name: metadataJson.name,
      symbol: metadataJson.symbol,
      image: metadataJson.image,
      description: metadataJson.description,
      tags: metadataJson.tags,
      mint: mintAddress,
      balance: (Number(parsedData.amount) / LAMPORTS_PER_SOL).toString(),
    };
  };

  return {
    acquireKeypair,
    fetchAssets,
    getMetadataOfToken,
    getPublicKey,
    getSolInfo,
  };
}
