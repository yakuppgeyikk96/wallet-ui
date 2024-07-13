"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import importWallet from "@/utils/import-wallet";
import useLocalStorage from "@/hooks/useLocalStorage";
import useSessionStorage from "@/hooks/useSessionStorage";
import { useRouter } from "next/navigation";

export default function ImportWallet() {
  const [mnemonic, setMnemonic] = useState("");
  const [password, setPassword] = useState("");

  const walletKeypairKey = process.env.NEXT_PUBLIC_LOCAL_STORAGE_KEY as
    | string
    | "cygnus-wallet-keypair";
  const sessionStoragePasswordKey =
    process.env.NEXT_PUBLIC_SESSION_STORAGE_KEY || "cygnus-wallet-password";

  const { setValue: setWalletData } = useLocalStorage(walletKeypairKey, "");
  const { setValue: setPasswordData } = useSessionStorage(
    sessionStoragePasswordKey,
    ""
  );

  const { toast } = useToast();
  const router = useRouter();

  const handleConfirm = () => {
    if (!mnemonic || !password) {
      toast({
        variant: "destructive",
        title: "Please fill in all fields",
      });
      return;
    }
    importWallet(mnemonic, password)
      .then(({ encryptedKeypairData, encryptedPasswordData }) => {
        setWalletData(encryptedKeypairData);
        setPasswordData(encryptedPasswordData);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error importing wallet",
        });
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Import an existing one</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p>Enter your mnemonic and define a password</p>
          </DialogTitle>
        </DialogHeader>
        <>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Mnemonics"
              type="text"
              value={mnemonic}
              onChange={(e) => setMnemonic(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button onClick={handleConfirm}>Confirm</Button>
        </>
      </DialogContent>
    </Dialog>
  );
}
