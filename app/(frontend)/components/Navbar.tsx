"use client"

import Link from "next/link";
import { useState } from "react";
import { Github, Sun, Moon, Telescope } from 'lucide-react';

interface NavbarProps {
    className?: string,
}

export default function Navbar({ className }:NavbarProps) {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const NavItems = [
        { icon: null, name: "Work", link: "/work" },
        { icon: null, name: "Blog", link: "/blog" },
        { icon: null, name: "Contact", link: "/contact" },
        { icon: null, name: "Resume", link: "/resume" },
        { icon: Github, name: "Source", link: "#source" }
    ]

    return (
        <nav className={`${className} flex items-center justify-center backdrop-blur-2xl bg-background/70 py-2`}>
            <div className="flex flex-row items-center gap-8 justify-center max-w-[40%] w-full">
                {/* Logo */}
                <Link href={`/`}>
                    <div className="flex flex-row items-center justify-center gap-2">
                        <Telescope size={24} strokeWidth={2} />
                        <h3 className="font-extrabold">Kyle Bolo</h3>
                    </div>
                </Link>
                {/* Nav Items */}
                <div className="flex flex-row items-center gap-4 justify-center">
                    {NavItems.map((item, index) => (
                        <Link key={index} href={item.link}>
                            <div className="flex flex-row items-center gap-2 justify-center hover:bg-accent/20 p-2 rounded-md transition-all duration-200 ease-in-out">
                                {item.icon && <item.icon size={16} strokeWidth={2.5}/>}
                                <h3 className="font-semibold">{item.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
                {/* Theme Toggle */}
                <div className="ml-auto flex flex-row items-center gap-4 justify-center">
                    <button className="btn bg-accent text-background" onClick={() => setIsDarkMode(!isDarkMode)}>
                        {isDarkMode ? <Sun size={16} /> : <Moon size={16} /> }
                    </button>
                </div>
            </div>
        </nav>
    )
}