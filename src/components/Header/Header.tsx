import GenreDropDown from "../GenreDropDownComponent/GenreDropDown";
import Logo from "../Logo";
import Menubar from "../Menubar";
import MobileNavbar from "../MobileNavbar";
import SearchInput from "../SearchInput";
import { ThemeToggler } from "../ThemeToggler";

async function Header() {
  return (
    <>
      <header
        className=" bg-white fixed w-full z-20 top-0 flex justify-between 
    items-center p-2 bg-gradient-to-t from-gray-200/0
     via-gray-800/25 to-gray-900 dark:bg-[#040714] "
      >
        <div className="max-[960px]:hidden flex">
          <Logo />
          <Menubar styles="flex items-center justify-end flex-nowrap m-0 p-0 relative mr-auto ml-[25px]" />
        </div>
        <MobileNavbar />
        <div className="flex space-x-2 items-center">
          <GenreDropDown />
          <SearchInput />
          <ThemeToggler />
        </div>
      </header>
    </>
  );
}

export default Header;
