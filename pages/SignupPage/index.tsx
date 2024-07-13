import CreateNewWallet from "@/components/CreateNewWallet";
import ImportWallet from "@/components/ImportWallet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function SignupPage() {
  return (
    <main className="flex justify-center items-center h-svh">
      <Card className="p-4">
        <CardHeader>
          <Image
            src="/images/cygnus.png"
            alt="Logo"
            width={96}
            height={96}
            className="mt-8 mb-12 self-center"
          />
          <CardTitle>Create a new wallet or import an existing one</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 my-4">
          <CreateNewWallet />
          <strong className="self-center">or</strong>
          <ImportWallet />
        </CardContent>
      </Card>
    </main>
  );
}
