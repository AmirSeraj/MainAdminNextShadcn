import { Skeleton } from "@nextui-org/skeleton";

const UsersSkeleton = () => {
  return (
    <div className="flex flex-col bg-[#eee] animate-pulse min-h-[235px]">
      <div>
        <Skeleton className="flex w-20 h-12" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
      </div>
    </div>
  );
};

export default UsersSkeleton;
