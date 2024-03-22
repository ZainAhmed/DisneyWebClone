import { navMenus } from "@/lib/getNavMenu";
import Image from "next/image";

type PropsType = {
  styles: string;
};
function Menubar(props: PropsType) {
  return (
    <div className={props.styles}>
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
            className="h-5 w-5 invert-0 mb-1 mr-0.5"
          />
          <span
            className="text-white whitespace-nowrap relative text-[13px] 
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
  );
}

export default Menubar;
