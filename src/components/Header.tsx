import GenreDropdown from "./GenreDropdown";
import Logo from "./Logo";
import Menubar from "./Menubar";
import SearchInput from "./SearchInput";
import { ThemeToggler } from "./ThemeToggler";

function Header() {
  return (
    <header
      className="bg-white fixed w-full z-20 top-0 flex justify-between 
    items-center p-2 bg-gradient-to-t from-gray-200/0
     via-gray-800/25 to-gray-900 dark:bg-[#040714]"
    >
      <Logo />
      <Menubar />
      <div className="flex space-x-2">
        <GenreDropdown />
        <SearchInput />
        <ThemeToggler />
      </div>
    </header>
  );
}

export default Header;
