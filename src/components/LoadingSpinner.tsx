"use client";
import { ClipLoader } from "react-spinners";

function LoadingSpinner() {
  return (
    <div className="bg-slate-300/10 h-[100vh] w-full flex items-center justify-center">
      <ClipLoader color="white" loading={true} size={150} />
    </div>
  );
}

export default LoadingSpinner;
