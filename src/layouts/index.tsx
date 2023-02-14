import React, { PropsWithChildren, useState } from "react";
import Link from "next/link";
import { addFont } from "../utils";
import { Menu, X } from "react-feather";
import { useRouter } from "next/router";
import clsx from "clsx";
import { CSSTransition } from "react-transition-group";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className="flex h-screen flex-col">
      <nav className="flex justify-between py-8 px-8 lg:px-24">
        <div className="name flex items-center gap-2">
          <svg width={22} height={22} viewBox="0 0 24 24">
            <circle cx="50%" cy="50%" r="10" className="fill-primary" />
          </svg>
          <span
            className={addFont([
              "text-2xl font-medium tracking-wide text-text",
            ])}
          >
            <Link href="/">Nikhil Joshi</Link>
          </span>
        </div>
        <div className={addFont(["links hidden gap-8 text-lg lg:flex"])}>
          <Link
            href="/blogs"
            className={clsx("transition-colors hover:text-primary", [
              router.asPath === "/blogs" && "text-sky-600",
            ])}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className={clsx("transition-colors hover:text-primary", [
              router.asPath === "/about" && "text-sky-600",
            ])}
          >
            About
          </Link>
          {/* <Link href="/#home">Projects</Link> */}
        </div>
        <button onClick={() => setShow(true)} className="lg:hidden">
          <Menu />
        </button>
      </nav>
      {/* // ! Menu */}
      <CSSTransition
        in={show}
        unmountOnExit
        classNames="slideIn"
        timeout={300}
        addEndListener={(n, d) => n.addEventListener("transitionend", d, false)}
      >
        <div className="fixed inset-0 z-50 grid h-screen w-screen place-items-center border bg-white text-2xl shadow-lg">
          <ul className="flex flex-col justify-center gap-8">
            <Link
              href="/blogs"
              onClick={() => setShow(false)}
              className={clsx("transition-colors hover:text-primary", [
                router.asPath === "/blogs" && "text-sky-600",
              ])}
            >
              Blog
            </Link>
            <Link
              href="/about"
              onClick={() => setShow(false)}
              className={clsx("transition-colors hover:text-primary", [
                router.asPath === "/about" && "text-sky-600",
              ])}
            >
              About
            </Link>
          </ul>
          <button onClick={() => setShow(false)}>
            <X />
          </button>
        </div>
      </CSSTransition>
      <React.Fragment>{children}</React.Fragment>
      <footer className="mt-auto flex justify-between py-8 px-8 lg:px-24">
        <div className="title flex gap-4">
          <svg
            preserveAspectRatio="none"
            width={36}
            height={36}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 334.805 289.949"
            className="fill-green-600"
          >
            <g>
              <path d="M167.402 0l167.403 289.949H0L167.402 0z"></path>
            </g>
          </svg>
          <div className="cont flex flex-col">
            <span
              className={addFont([
                "text-3xl font-medium tracking-wide text-text lg:text-5xl",
              ])}
            >
              Contact
            </span>
            <div className="links mt-8 flex flex-col gap-4 text-lg font-medium tracking-wide lg:mb-12 lg:flex-row lg:gap-12 lg:text-2xl">
              <Link
                href="https://twitter.com/nikhilakjoshi"
                target="_blank"
                className="transition-colors duration-500 hover:text-primary"
              >
                Twitter
              </Link>
              <Link
                href="https://www.linkedin.com/in/nikhilakjoshi/"
                target="_blank"
                className="transition-colors duration-500 hover:text-primary"
              >
                LinkedIn
              </Link>
              <Link
                href="https://github.com/nikhilakjoshi"
                target="_blank"
                className="transition-colors duration-500 hover:text-primary"
              >
                GitHub
              </Link>
              <Link
                href="mailto:nikhilakjoshi@gmail.com?subject=Hey there!"
                target="_self"
                className="transition-colors duration-500 hover:text-primary"
              >
                Email
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
