"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("FETCH FROM API SERVER FAILED:", error);
  }, [error]);

  const handleRefreshClick = () => {
    reset();
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center h-[100vh] w-full">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1>Something went wrong! 😧❌</h1>
        <Button variant="destructive" onClick={handleRefreshClick}>
          Try again
        </Button>
      </div>
    </div>
  );
}
