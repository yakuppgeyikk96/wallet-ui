"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import useSessionStorage from "@/hooks/useSessionStorage";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function SessionControl({
  children,
}: {
  children: React.ReactNode;
}) {
  const walletKeypairKey = process.env.NEXT_PUBLIC_LOCAL_STORAGE_KEY as
    | string
    | "cygnus-wallet-keypair";
  const router = useRouter();
  const pathname = usePathname();
  const [storedKey] = useLocalStorage(walletKeypairKey, "");
  const [storedPassword] = useSessionStorage("cygnus-wallet-password", "");

  useEffect(() => {
    if (!storedKey && pathname !== "/signup") {
      router.push("/signup");
      return;
    }
    if (storedKey && !storedPassword && pathname !== "/login") {
      router.push("/login");
      return;
    }
  }, [pathname, router, storedKey, storedPassword]);

  return children;
}
