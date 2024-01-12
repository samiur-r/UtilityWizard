"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { logout } from "@/actions/logout";
import { usePathname } from "next/navigation";

interface NavigationType {
  id: number;
  name: string;
  href: string;
}

interface HeaderProps {
  navigation: NavigationType[];
}

const Header: React.FC<HeaderProps> = ({ navigation }) => {
  const pathname = usePathname();
  const isActiveNavItem = (href: string) => pathname === href;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-secondary w-full">
      <nav
        className="mx-auto flex container items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <Image src="/logo.png" width={50} height={50} alt="logo" />
        </Link>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-primary"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-8 w-8" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-5">
          {navigation.map((item) =>
            item.name === "Logout" ? (
              <form key={item.id} action={logout}>
                <button className="text-sm font-semibold leading-6 text-primary flex gap-2 items-center p-2">
                  {item.name}
                </button>
              </form>
            ) : (
              <Link
                key={item.id}
                href={item.href}
                className={`text-sm font-semibold leading-6 flex gap-2 items-center p-2 ${
                  isActiveNavItem(item.href)
                    ? "bg-primary text-gray-900 rounded-md"
                    : "text-primary"
                }`}
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-secondary px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image src="/logo.png" width={50} height={50} alt="logo" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <hr className="border-b border-primary" />
            <div className="flex flex-col gap-2 mt-5">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`text-sm font-semibold leading-6 flex gap-2 items-center p-2 ${
                    isActiveNavItem(item.href)
                      ? "bg-primary text-gray-900 rounded-md"
                      : "text-primary"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;
