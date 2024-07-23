"use client";

import { navLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Separator } from "../ui/separator";
import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className="sidebar sticky top-0 transition-all">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/icons/stars.svg"
            alt="logo"
            width={36}
            height={36}
          />
        </Link>

        <nav className="sidebar-nav flex justify-between">
          <ul className="sidebar-nav_elements">
            {navLinks.map((link) => {
              const isActive = pathname.includes(link.uap);

              return (
                <li
                  key={link.route}
                  className={`sidebar-nav_element group ${
                    isActive ? "bg-accent " : ""
                  }`}
                  title={link.label}
                >
                  <Link className="sidebar-link" href={link.route}>
                    <Image src={link.icon} alt="logo" width={24} height={24} />
                    {isOpen ? <span className="w-44">{link.label}</span> : ""}
                  </Link>
                </li>
              );
            })}
          </ul>
          {/* <Separator className="my-2" /> */}
          <ul className="sidebar-nav_elements">
            <li className="sidebar-nav_element group">
              <div
                className="sidebar-link cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
                title={isOpen ? "Shrink sidebar" : "Enlarge sidebar"}
              >
                <Image
                  src="/assets/icons/menu.svg"
                  alt="menu"
                  width={24}
                  height={24}
                />
                {isOpen ? (
                  <span className="font-normal">Shrink sidebar</span>
                ) : (
                  ""
                )}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
