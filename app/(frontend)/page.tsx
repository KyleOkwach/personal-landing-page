import Image from "next/image";
import Navbar from "./components/Navbar";
import { ChevronRight, CircleUserRound } from "lucide-react";
import Segment from "./components/Segment";
import Link from "next/link";
import ThoughtCard from "./components/ThoughtCard";

export default function Page() {
  const thoughts = [
    {
      title: '🧠 The Debugging Guitar Solo',
      date: 'April 15, 2025',
      excerpt:
        'There’s something weirdly similar between fixing a bug and improvising a guitar solo. You’re listening for patterns, dissonance, flow...',
      slug: 'debugging-guitar-solo',
    },
    {
      title: '🎯 Archery and Algorithms',
      date: 'April 12, 2025',
      excerpt:
        'Practicing archery made me realize how much coding is about rhythm and feedback loops. Align, release, adjust. Same with models.',
      slug: 'archery-and-algorithms',
    },
  ];

  return (
    <div className="flex flex-col items-center h-full gap-8">
      {/* Intro */}
      <div className="flex flex-col w-full items-center gap-4">
        <div className="flex w-full items-center justify-center bg-text/10 backdrop-blur-2xl p-3 rounded-md">
          <p>Where code meets exploration, engineering, stories, and art!</p>
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
        <div className="flex flex-col w-full items-center gap-4">
          <p className="text-justify indent-4">
          I'm Kyle Bolo, a curious builder at the intersection of software engineering, machine learning, and data systems.
          I thrive on crafting clean code, designing smart models, and making pipelines that somehow just work.
          Outside of code, I’m either strumming my guitar, sketching ideas, or diving into some obscure tech mystery.
          I believe in the power of creation, tools, ideas, and stories, and I’m always up for solving meaningful problems with passionate people.
          Let's create something awesome!
          </p>
          <Link href={"/works"}>
            <button className="btn bg-primary p-2 px-4 text-background">
              My Work <ChevronRight size={16} strokeWidth={1} />
            </button>
          </Link>
        </div>
      </Segment>

      {/* Thought Dump */}
      <Segment title="Thought Dump" className="flex flex-col gap-4">
        <p className="text-justify indent-4">
          A messy corner for unfiltered ideas, fleeting insights, dev notes, shower thoughts, half-baked theories, and wild what-ifs.
        </p>
        <div className="flex flex-col gap-4">
          {thoughts.map((thought) => (
            <ThoughtCard
              key={thought.slug}
              title={thought.title}
              date={thought.date}
              excerpt={thought.excerpt}
              slug={thought.slug}
            />
          ))}
        </div>
      </Segment>
    </div>
  );
}
