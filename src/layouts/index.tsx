import { Rubik } from "@next/font/google";
import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { addFont } from "../utils";
import { Menu } from "react-feather";

const font = Rubik({ subsets: ["latin"] });

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col">
      <nav className="flex justify-between py-8 px-8 md:px-24">
        <div className="name flex items-center gap-2">
          <svg width={22} height={22} viewBox="0 0 24 24">
            <circle cx="50%" cy="50%" r="10" className="fill-primary" />
          </svg>
          <span
            className={addFont(["text-xl font-medium tracking-wide text-text"])}
          >
            Nikhil Joshi
          </span>
        </div>
        <div className={addFont(["links hidden gap-8 text-lg md:flex"])}>
          <Link href="/#home">Home</Link>
          <Link href="/#about">About</Link>
          <Link href="/#home">Projects</Link>
        </div>
        <button className="md:hidden">
          <Menu />
        </button>
      </nav>
      <React.Fragment>{children}</React.Fragment>
    </div>
  );
};

export default Layout;
