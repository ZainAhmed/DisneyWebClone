"use client";

import Image from "next/image";
import { useState } from "react";
import Logo from "./Logo";
import Menubar from "./Menubar";

function MobileNavbar() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="mt-[20px] mx-[20px]  mb-[10px] flex min-[960px]:hidden justify-between items-center">
      <Image
        className="block cursor-pointer mr-[10px]"
        src="/menu.png"
        alt=""
        height={25}
        width={25}
        onClick={() => setOpen((prev) => !prev)}
      />
      {isOpen && (
        <div
          className="z-20 absolute top-[63px] left-0 md:max-[960px]:w-[25%] max-md:w-[50%]
          h-[100vh] dark:bg-[#040714] bg-white flex flex-col mt-[10px] mb-[10px]"
        >
          <Logo />
          <Menubar styles="flex flex-col items-center justify-end flex-nowrap m-0 p-0 relative mr-auto ml-[25px] gap-[15px]" />
        </div>
      )}
    </div>
  );
}

export default MobileNavbar;
