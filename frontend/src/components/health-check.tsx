"use client";
import { useQuery } from "@tanstack/react-query";
import { getHealthStatus } from "@/lib/api-client";

export default function HealthCheck() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["health"],
    queryFn: getHealthStatus,
    refetchInterval: 30_000,
  });

  return (
    <div className="p-4 border rounded">
      <h3 className="font-medium mb-2">Backend Health Status</h3>
      {isLoading && <p>Checking...</p>}
      {error && (
        <p className="text-red-600">Error: {(error as Error).message}</p>
      )}
      {data && (
        <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

