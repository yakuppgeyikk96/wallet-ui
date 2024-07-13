"use client";

import useWallet, { ITokenMetadata } from "@/hooks/useWallet";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import TokenSelect from "./TokenSelect";
import { Input } from "../ui/input";
import { ArrowRightIcon } from "lucide-react";
import getSwapRate from "@/utils/get-swap-rate";
import { Button } from "../ui/button";
import getSwapQuote from "@/utils/get-swap-quote";

export default function SwapForm() {
  const { fetchAssets, getMetadataOfToken, getSolInfo } = useWallet();
  const [tokenList, setTokenList] = useState<ITokenMetadata[]>([]);

  const [fromAssetSymbol, setFromAssetSymbol] = useState<string | null>(null);
  const [toAssetSymbol, setToAssetSymbol] = useState<string | null>(null);
  const [swapRate, setSwapRate] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | null>(null);

  const fetchTokenAssets = async () => {
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
    }
  };

  const handleFromAssetSelected = (value: string) => {
    setFromAssetSymbol(value);
  };

  const handleToAssetSelected = (value: string) => {
    setToAssetSymbol(value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (fromAssetSymbol && toAssetSymbol) {
      setAmount(Number(val));
      getSwapRate(fromAssetSymbol, toAssetSymbol).then((data) => {
        setSwapRate(Number(val) * data);
      });
    }
  };

  const triggerSwap = () => {
    const selectedFrom = tokenList.find(
      (token) => token.symbol === fromAssetSymbol
    );
    const selectedTo = tokenList.find(
      (token) => token.symbol === toAssetSymbol
    );

    if (selectedFrom && selectedTo) {
      const inputMint = selectedFrom.mint?.toBase58();
      const outputMint = selectedTo.mint?.toBase58();

      if (inputMint && outputMint && amount) {
        getSwapQuote(inputMint, outputMint, amount).then((data) => {
          console.log(data);
        });
      }
    }
  };

  const isAmountDisabled = useMemo(() => {
    if (
      !(fromAssetSymbol && toAssetSymbol) ||
      fromAssetSymbol === toAssetSymbol
    ) {
      return true;
    }
    return false;
  }, [fromAssetSymbol, toAssetSymbol]);

  useEffect(() => {
    fetchTokenAssets();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <TokenSelect
        placeholder="From"
        tokenList={tokenList}
        onSelect={handleFromAssetSelected}
      />
      <TokenSelect
        placeholder="To"
        tokenList={tokenList}
        onSelect={handleToAssetSelected}
      />
      <div className="flex justify-between">
        <div>
          <div className="mb-2 pl-4 font-semibold">{fromAssetSymbol}</div>
          <Input
            type="number"
            step={0.1}
            min={0}
            placeholder="Please enter amount..."
            disabled={isAmountDisabled}
            onChange={handleAmountChange}
          />
        </div>
        <ArrowRightIcon size={32} />
        <div>
          <div className="mb-2 font-semibold pl-4">{toAssetSymbol}</div>
          <Input
            value={swapRate ? swapRate.toFixed(4).toString() : ""}
            placeholder="Amount"
            readOnly
          />
        </div>
      </div>
      <Button disabled={isAmountDisabled} onClick={triggerSwap}>
        Swap
      </Button>
    </div>
  );
}
