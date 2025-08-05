"use client"
import { useState } from "react";
import { usePathname } from 'next/navigation';
import { Hand } from "lucide-react";
import Prompt from "./ui/Prompt";
import Link from "next/link";
import { navItems } from "../consts";

export default function Terminal({className}: {className?: string}) {
  const ascii = `
##:::'##:'##:::'##:'##:::::::'########:'########:::'#######::'##::::::::'#######::
##::'##::. ##:'##:: ##::::::: ##.....:: ##.... ##:'##.... ##: ##:::::::'##.... ##:
##:'##::::. ####::: ##::::::: ##::::::: ##:::: ##: ##:::: ##: ##::::::: ##:::: ##:
#####::::::. ##:::: ##::::::: ######::: ########:: ##:::: ##: ##::::::: ##:::: ##:
##. ##:::::: ##:::: ##::::::: ##...:::: ##.... ##: ##:::: ##: ##::::::: ##:::: ##:
##:. ##::::: ##:::: ##::::::: ##::::::: ##:::: ##: ##:::: ##: ##::::::: ##:::: ##:
##::. ##:::: ##:::: ########: ########: ########::. #######:: ########:. #######::
..::::..:::::..:::::........::........::........::::.......:::........:::.......::
  `

  const [text, setText] = useState("make run");
  const handleSubmit = (inputText: string) => {
    // Handle the input text submission
    console.log("Submitted text:", inputText);
    setText(""); // Clear the input after submission
  };
  const pathname = usePathname();

  return (
    <div className={`${pathname === "/" ? "hidden" : "hidden lg:flex"} flex-col terminal h-full w-1/2 border-solid border-secondary border-r-[1px] overflow-y-auto ${className}`}>
      {/* Text Area */}
      <div className="flex flex-col p-4">
        <Prompt text={text} onChange={setText} onSubmit={handleSubmit} disabled={true} />
      </div>

      {/* Welcome Header */}
      <div className="flex flex-col items-start mb-2 px-4">
        <div className="w-fit">
          <Link href={"/"}>
            <pre className="ascii-art xl:text-xs text-[0.6rem]">{ascii}</pre>
          </Link>
          <div className="flex items-center justify-center gap-2 bg-secondary text-primary w-full p-2 my-2">
            <Hand size={16} />
            <h3 className=" text-center font-semibold">
              Welcome to my corner!
            </h3>
          </div>
          <h3 className="font-semibold text-xl">Software Engineer</h3>
        </div>
        <p>
          Designing, building and shipping products for fun!
        </p>
        <div className="flex flex-col gap-1 p-2">
          {navItems.map((item, index) => (
            <Link
            key={index}
              href={item.path}
              className={`flex gap-2 group items-center font-semibold ${pathname === item.path && 'text-accent'}`}
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
        <button className="flex mt-4 group cursor-pointer border-[1px] border-tertiary">
          <span className="group-hover:underline font-semibold p-2 px-4 bg-tertiary text-primary translate-1 group-hover:translate-0 transition-all duration-100 ease-in">Reach out</span>
        </button>
      </div>
    </div>
  );
}
