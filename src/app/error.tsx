"use client";

import ErrorComponent from "@/components/ErrorComponent";

function ErrorBoundary() {
  return (
    <div>
      <ErrorComponent errorMsg="error" />
    </div>
  );
}

export default ErrorBoundary;
