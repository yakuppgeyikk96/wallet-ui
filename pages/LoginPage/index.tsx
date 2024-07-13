"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useSessionStorage from "@/hooks/useSessionStorage";
import { useState } from "react";
import crypto from "crypto-js";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const sessionStoragePasswordKey =
    process.env.NEXT_PUBLIC_SESSION_STORAGE_KEY || "cygnus-wallet-password";
  const sessionStorageEncryptionKey =
    process.env.NEXT_PUBLIC_SESSION_STORAGE_ENCRYPTION_KEY || "";

  const { setValue: setStoredPassword } = useSessionStorage(
    sessionStoragePasswordKey,
    ""
  );

  const [password, setPassword] = useState("");

  const router = useRouter();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (password) {
      const encryptedPassword = crypto.AES.encrypt(
        password,
        sessionStorageEncryptionKey
      ).toString();
      setStoredPassword(encryptedPassword);
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center sm:w-full md:w-2/3 xl:w-1/2 h-lvh mx-auto">
      <Card className="w-full flex flex-col items-center gap-8 pt-8 pb-16 rounded-xl">
        <img src="/images/cygnus.png" alt="Cygnus" width={96} height={96} />
        <Input
          type="password"
          placeholder="Password"
          className="w-1/2"
          onChange={handlePasswordChange}
        />
        <Button className="w-1/2" disabled={!password} onClick={handleLogin}>
          Login
        </Button>
      </Card>
    </div>
  );
}
