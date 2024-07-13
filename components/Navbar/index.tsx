import Image from "next/image";
import { navbarItems } from "./constant";
import NavbarItem from "./NavbarItem";
import AccountDropdown from "../AccountDropdown";

export default function Navbar() {
  return (
    <nav className="border-b border-b-slate-200">
      <div className="flex items-center justify-between md:container py-4">
        <Image
          src="/images/cygnus.png"
          alt="cygnus-logo"
          width={64}
          height={64}
        />
        <ul className="flex gap-4">
          {navbarItems.map(({ key, label, href }) => (
            <NavbarItem key={key} label={label} href={href} />
          ))}
        </ul>
        <AccountDropdown />
      </div>
    </nav>
  );
}
