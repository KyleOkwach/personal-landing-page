"use client"
import { Globe } from "lucide-react";
import Terminal from "../Terminal";
import { usePathname } from "next/navigation";
import { navItems } from "@/app/consts";

export default function TerminalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const pathname = usePathname();

    return (
        <div className="flex items-center justify-center h-screen w-screen p-4 xl:p-8 xl:px-16">
            <div className="flex flex-col relative border-double border-secondary border-4 rounded-md h-full w-full">
                <nav className="w-full hidden p-2 px-4 terminal items-center justify-between border-solid border-secondary border-b-[1px]">
                    <div>Welcome</div>
                </nav>
                <div className="flex flex-row h-full w-full">
                    <Terminal />
                    <div className="flex-1 overflow-y-auto p-8 xl:px-16">
                        {children}
                    </div>
                </div>
                {/* Socials */}
                <div className="flex w-full justify-between bg-secondary-300 mb-4 bottom-0 left-0 z-40 terminal">
                    <div className="flex">
                        <div className="bg-accent z-20 text-primary p-0.5 px-2 pr-6 terminal-tab">
                            <Globe size={16} />
                            <h3 className="font-semibold">My Socials</h3>
                        </div>
                        <div className="bg-secondary-500 px-6 z-10 terminal-tab translate-x-[-80%]" />
                        <div className="bg-secondary-400 px-6 pl-8 terminal-tab translate-x-[-50%] flex gap-2">
                            <h3 className="font-semibold">{navItems.find(item => item.path === pathname)?.name}</h3>
                        </div>
                    </div>
                    <div className="flex items-center px-2 pl-4 rounded-l-full bg-secondary-600">
                        <span className="font-semibold">84%</span>
                    </div>
                </div>
            </div>
        </div>
  );
}