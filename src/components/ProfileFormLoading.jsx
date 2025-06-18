export function ProfileFormLoading() {
  return (
    <div className="space-y-5 animate-pulse">
      <div>
        <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
        <div className="h-10 w-full bg-gray-200 rounded" />
      </div>
      <div>
        <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
        <div className="h-10 w-full bg-gray-200 rounded" />
      </div>
      <div className="h-10 w-full bg-gray-300 rounded mt-4" />
    </div>
  );
}
