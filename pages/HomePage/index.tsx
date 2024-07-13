import TokenAssets from "@/components/TokenAssets";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 mt-4 p-4 mx-auto sm:w-full md:w-2/3 xl:w-1/2">
      <TokenAssets />
    </div>
  );
}
