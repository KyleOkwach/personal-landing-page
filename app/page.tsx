import Image from "next/image";
import ASCIIDonut from "./components/ASCIIDonut";

export default function Home() {
  return (
    <div className="terminal">
      Welcome
      <ASCIIDonut />
    </div>
  );
}
