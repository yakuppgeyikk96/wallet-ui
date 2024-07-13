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
import createWallet from "@/utils/create-wallet";
import Mnemonics from "../Mnemonics";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import useSessionStorage from "@/hooks/useSessionStorage";
import crypto from "crypto-js";

export default function CreateNewWallet() {
  const walletKeypairKey = process.env.NEXT_PUBLIC_LOCAL_STORAGE_KEY as
    | string
    | "cygnus-wallet-keypair";
  const sessionStoragePasswordKey =
    process.env.NEXT_PUBLIC_SESSION_STORAGE_KEY || "cygnus-wallet-password";
  const sessionStorageEncryptionKey =
    process.env.NEXT_PUBLIC_SESSION_STORAGE_ENCRYPTION_KEY || "";

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [walletData, setWalletData] = useState<
    | {
        mnemonic: string;
        encryptedKeypairData: string;
      }
    | undefined
  >(undefined);

  const { value, setValue } = useLocalStorage(walletKeypairKey, "");
  const { setValue: setStoredPassword } = useSessionStorage(
    sessionStoragePasswordKey,
    ""
  );

  const router = useRouter();
  const { toast } = useToast();

  const handleConfirm = () => {
    if (password1 !== password2) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
      });
      return;
    }

    createWallet(password1).then(({ mnemonic, encryptedKeypairData }) => {
      if (mnemonic && encryptedKeypairData) {
        setWalletData({ mnemonic, encryptedKeypairData });
        setValue(encryptedKeypairData);

        const encryptedPassword = crypto.AES.encrypt(
          password1,
          sessionStorageEncryptionKey
        ).toString();
        setStoredPassword(encryptedPassword);
      }
    });
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setPassword1("");
      setPassword2("");
      setWalletData(undefined);

      if (value) {
        router.push("/");
      }
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Create a new wallet</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {walletData && walletData.mnemonic
              ? "Your mnemonic phrase"
              : "Define a password"}
          </DialogTitle>
        </DialogHeader>
        {walletData && walletData.mnemonic ? (
          <Mnemonics mnemonics={walletData.mnemonic} />
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Password"
                type="password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
              <Input
                placeholder="Confirm password"
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>

            <Button onClick={handleConfirm}>Confirm</Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
