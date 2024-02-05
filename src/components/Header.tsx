import { navMenus } from "@/lib/getNavMenu";
import Image from "next/image";
import Link from "next/link";
import GenreDropdown from "./GenreDropdown";
import SearchInput from "./SearchInput";
import { ThemeToggler } from "./ThemeToggler";

function Header() {
  return (
    <header
      className="bg-white fixed w-full z-20 top-0 flex justify-between 
    items-center p-2 bg-gradient-to-t from-gray-200/0
     via-gray-800/25 to-gray-900 dark:bg-[#040714]"
    >
      <Link href="/" className="mx-10 mb-2">
        <Image
          src="/images/logo.svg"
          alt="Disney Logo"
          width={120}
          height={100}
          className="cursor-pointer hidden dark:block"
        />
        <Image
          src="/images/logoDark.svg"
          alt="Disney Logo"
          width={120}
          height={100}
          className="cursor-pointer dark:hidden"
        />
      </Link>
      <div className="flex items-center justify-end flex-nowrap m-0 p-0 relative mr-auto ml-[25px]">
        {navMenus.map((navMenu, index) => (
          <a
            className="flex items-center py-0 px-3 "
            href={navMenu.href}
            key={index}
          >
            <Image
              src={navMenu.src}
              alt={navMenu.title}
              width={20}
              height={20}
              className="h-5 w-5 invert dark:invert-0 mb-1 mr-0.5"
            />
            <span
              className="whitespace-nowrap relative text-[13px] 
              tracking-[1.42px] px-0 py-[2px] before:w-0 
              before:h-1 before:absolute before:bottom-0 
              before:right-0 before:bg-white before:transition-all 
              before:duration-500  hover:before:w-full 
              hover:before:left-0 hover:before:bg-white"
            >
              {navMenu.title}
            </span>
          </a>
        ))}
      </div>
      <div className="flex space-x-2">
        <GenreDropdown />
        <SearchInput />
        <ThemeToggler />
      </div>
    </header>
  );
}

export default Header;
