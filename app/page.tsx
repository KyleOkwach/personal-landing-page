"use client"
import ASCIIDonut from "./components/ASCIIDonut";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./consts";

export default function Home() {
  const pathname = usePathname();

  return (
    <div className="terminal flex flex-col gap-8 items-center h-full w-fit mx-auto">
      <ASCIIDonut className="text-secondary-500 flex items-center justify-center" />
      <div className="flex flex-col h-full">
        <span className="text-secondary-500 font-semibold">- Select a file(page) to begin</span>
        <div className="flex flex-col w-full items-start gap-1 p-2 mx-auto">
          {navItems.map((item, index) => (
            <Link
            key={index}
              href={item.path}
              className={`flex gap-2 group hover:text-accent items-center font-semibold ${pathname === item.path && 'text-accent'}`}
            >
              <span className="flex text-md">
                --{pathname === item.path && '>'}
                <span className={`${pathname === item.path ? 'hidden': 'hidden group-hover:block'}`}>-</span>
              </span>
              {item.icon}
              <span className="text-md">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
        <footer className="text-secondary-500 text-sm text-center mt-auto p-2">
          Kyle Okwach © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}
