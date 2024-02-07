import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
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
  );
}

export default Logo;
