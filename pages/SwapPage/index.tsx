import SwapForm from "@/components/SwapForm";
import { Card } from "@/components/ui/card";

export default function SwapPage() {
  return (
    <Card className="flex flex-col gap-4 mt-4 p-12 mx-auto sm:w-full md:w-2/3 xl:w-1/2">
      <SwapForm />
    </Card>
  );
}
