"use client";

import Link from "next/link";
import { INavbarItem } from "./model";
import { usePathname } from "next/navigation";

export default function NavbarItem({ label, href }: Omit<INavbarItem, "key">) {
  const pathname = usePathname();

  const classNameOfItem = `border py-2 px-4 cursor-pointer rounded-lg font-semibold ${
    pathname === href ? "bg-primary text-white" : ""
  }`;

  return (
    <li>
      <Link legacyBehavior href={href}>
        <div className={classNameOfItem}>{label}</div>
      </Link>
    </li>
  );
}
