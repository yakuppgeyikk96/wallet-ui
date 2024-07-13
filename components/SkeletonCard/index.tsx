import { Skeleton } from "../ui/skeleton";

export default function SkeletonCard() {
  return (
    <>
      <Skeleton className="h-16 w-[800px] bg-slate-200" />
      <Skeleton className="h-16 w-[800px] bg-slate-200" />
      <Skeleton className="h-16 w-[800px] bg-slate-200" />
      <Skeleton className="h-16 w-[800px] bg-slate-200" />
    </>
  );
}
