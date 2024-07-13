"use client";

import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import useWallet, { ITokenMetadata } from "@/hooks/useWallet";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import SkeletonCard from "../SkeletonCard";

export default function TokenAssets() {
  const [tokenList, setTokenList] = useState<ITokenMetadata[]>([]);
  const [assetsLoading, setAssetsLoading] = useState(true);

  const { fetchAssets, getMetadataOfToken, getSolInfo } = useWallet();
  const { toast } = useToast();

  const fetchWalletAssets = async () => {
    try {
      const tokenAccounts = await fetchAssets();
      if (tokenAccounts && tokenAccounts.value) {
        const tokenList = await Promise.all(
          tokenAccounts.value.map(async (tokenAccount) => {
            const metadata = await getMetadataOfToken(tokenAccount);
            return metadata;
          })
        );

        const solMetadata = await getSolInfo();

        setTokenList([solMetadata, ...tokenList]);
        setAssetsLoading(false);
      }
    } catch (error) {
      setAssetsLoading(false);
      return;
    }
  };

  const renderTokenAssets = () => {
    return tokenList.map((token, index) => {
      return (
        <Card
          key={token.mint ? token.mint.toBase58() : index}
          className="flex items-center gap-8 px-6 py-8 rounded-xl"
        >
          <img
            src={token.image}
            alt={token.mint ? token.mint.toBase58() : ""}
            width={64}
            height={64}
          />
          <div className="flex flex-col">
            <strong>{token.name}</strong>
            <div>
              {token.balance} {token.symbol}
            </div>
          </div>
          <div className="flex flex-col gap-2 ml-auto">
            <Button>Send</Button>
            <Button>Swap</Button>
          </div>
        </Card>
      );
    });
  };

  useEffect(() => {
    setAssetsLoading(true);
    fetchWalletAssets();
  }, []);

  return assetsLoading ? <SkeletonCard /> : renderTokenAssets();
}
