import { textClasses } from "@/styles/textClasses";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-2 flex flex-col gap-4">
      <p className={textClasses.body}>
        Original approaches to brand building for creatively-minded clients.
      </p>
      <Image
        src="/images/bookshop-monocle.png"
        alt="Bookshop with Monocle magazines"
        width={1051}
        height={699}
      />
    </div>
  );
}
