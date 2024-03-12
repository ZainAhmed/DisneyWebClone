"use client";
import { ClipLoader } from "react-spinners";

function LoadingSpinner() {
  return (
    <div className="bg-[#040714]/95 h-[100vh] w-full flex items-center justify-center">
      <ClipLoader loading={true} size={150} color="white" />
    </div>
  );
}

export default LoadingSpinner;
