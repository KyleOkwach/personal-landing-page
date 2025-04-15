import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="flex items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* About */}
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-extrabold">Kyle Bolo</h1>
        <h2 className="text-2xl font-semibold">Software Engineer</h2>
        <h3 className="text-lg font-medium">Building the future, one line of code at a time.</h3>
      </div>
    </div>
  );
}
