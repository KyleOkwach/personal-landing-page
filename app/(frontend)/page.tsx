import Image from "next/image";
import Navbar from "./components/Navbar";
import { CircleUserRound } from "lucide-react";
import Segment from "./components/Segment";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-full gap-4">
      {/* Intro */}
      <div className="flex flex-col w-full items-center gap-4">
        <div className="flex w-full items-center justify-center bg-text/10 backdrop-blur-2xl p-3 rounded-md">
          <p>Hello, I'm Kyle. Addicted to Engineering!</p>
        </div>

        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col items-start justify-center gap-2">
            <h1 className="text-3xl font-bold">Kyle Bolo</h1>
            <p className="text-sm text-text/70">Software Engineer/Data Engineer/Artist</p>
          </div>
          <div className="flex w-24 h-24 rounded-full border-[1px] border-white">
            <Image src="/placeholder.jpg" alt="Profile Picture" width={96} height={96} className="rounded-full" />
          </div>
        </div>
      </div>

      {/* About */}
      <Segment title="About">
        <p className="text-justify">
        Hi, I'm Kyle Bolo, a curious mind obsessed with building, exploring, and figuring things out with code, data, and a pinch of artistic anarchy.
        I excel where software engineering, machine learning, and data systems intersect, whether that's crafting clean code, designing smart models, or
        stitching together pipelines that, miraculously, just work. Outside of engineering mode, you can most likely find me playing guitar, sketching on
        paper (or my IDE corners), or tumbling down some obscure technical rabbit hole because I just had to figure out how it works. I think that
        creation, tools, ideas, and stories are powerful, and I'm always looking for meaningful problems to solve and passionate teams to collaborate with.
        Let's create something amazing.
        </p>
      </Segment>
    </div>
  );
}
