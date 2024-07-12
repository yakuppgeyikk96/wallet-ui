"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useState } from "react";

export default function Mnemonics({ mnemonics }: { mnemonics: string }) {
  const mnemonicArray = mnemonics.split(" ");
  const [mnemonicsCopied, setMnemonicsCopied] = useState(false);

  const copyMnemonics = async () => {
    try {
      navigator.clipboard.writeText(mnemonics);
      setMnemonicsCopied(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 py-2">
      {mnemonicArray.map((mnemonic, index) => (
        <Badge key={index} variant="outline">
          {mnemonic}
        </Badge>
      ))}
      <Button
        variant="outline"
        className="w-full flex gap-4"
        onClick={copyMnemonics}
      >
        {mnemonicsCopied ? (
          <CheckIcon size={16} color="green" />
        ) : (
          <CopyIcon size={16} />
        )}
        Copy
      </Button>
    </div>
  );
}
