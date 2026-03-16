export default function JobsLoading() {
  return (
    <div className="px-6 md:px-12 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex gap-12">
          <div className="w-[280px] shrink-0 space-y-6">
            <div className="h-8 bg-mist rounded animate-pulse" />
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-5 bg-mist rounded animate-pulse" />
              ))}
            </div>
          </div>
          <div className="flex-1 grid gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-48 bg-mist rounded-2xl animate-pulse"
                style={{
                  animationDelay: `${i * 100}ms`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
