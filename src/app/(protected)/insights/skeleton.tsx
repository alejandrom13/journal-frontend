const HomeSkeletonLoader = () => {
    return (
      <div role="status" className="">
        <Skeleton height="100px" width="100%" className="mb-4 rounded-3xl" />
        <Skeleton height="40px" width="100%" className="mb-4 rounded-full" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton height="100px" width="100%" className="rounded-3xl" />
          <Skeleton height="100px" width="100%" className="rounded-3xl" />
          <Skeleton height="100px" width="100%" className="rounded-3xl" />
  
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  };
  
  export default HomeSkeletonLoader;
  
  const Skeleton = ({ height, width, className }: any) => {
    return (
      <div
        style={{ height: height, width: width }}
        className={`animate-pulse bg-white/50 ${className}`}
      ></div>
    );
  };
  