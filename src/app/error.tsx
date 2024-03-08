"use client";

import ErrorComponent from "@/components/ErrorComponent";

function error() {
  return (
    <div>
      <ErrorComponent errorMsg="error" />
    </div>
  );
}

export default error;
