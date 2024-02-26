"use client";
import { ClipLoader } from "react-spinners";

function LoadingSpinner() {
  return (
    <div className="bg-slate-300/10 h-[100vh] w-full flex items-center justify-center">
      <ClipLoader
        className="border-b-[#040714] border-t-[#040714] border-r-[#040714]  border-l-[#040714]  
        dark:!border-b-white dark:!border-t-white dark:!border-r-white dark:!border-l-white "
        loading={true}
        size={150}
      />
    </div>
  );
}

export default LoadingSpinner;
