"use client";

import useWallet from "@/hooks/useWallet";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  CopyIcon,
  DeleteIcon,
  LogOutIcon,
  ShieldCloseIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import useSessionStorage from "@/hooks/useSessionStorage";

export default function AccountDropdown() {
  const walletKeypairKey = process.env.NEXT_PUBLIC_LOCAL_STORAGE_KEY as
    | string
    | "cygnus-wallet-keypair";
  const sessionStoragePasswordKey =
    process.env.NEXT_PUBLIC_SESSION_STORAGE_KEY || "cygnus-wallet-password";

  const [publicKey, setPublicKey] = useState<string>("");

  const { removeValue: removeKeypairValue } = useLocalStorage(
    walletKeypairKey,
    ""
  );
  const { removeValue: removePasswordValue } = useSessionStorage(
    sessionStoragePasswordKey,
    ""
  );
  const { getPublicKey } = useWallet();
  const router = useRouter();

  const handleRemove = () => {
    removePasswordValue();
    removeKeypairValue();
    router.push("/signup");
  };

  const handleLogout = () => {
    removePasswordValue();
    router.push("/login");
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(publicKey);
  };

  useEffect(() => {
    getPublicKey()
      .then((publicKey) => {
        setPublicKey(publicKey ? publicKey.toBase58() : "");
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="max-w-32 truncate">
          <p className="truncate">{publicKey}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleCopyAddress}>
            <CopyIcon className="mr-2 h-4 w-4" />
            <span>Copy Address</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleRemove}>
            <ShieldCloseIcon className="mr-2 h-4 w-4" />
            <span>Disconnect</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
