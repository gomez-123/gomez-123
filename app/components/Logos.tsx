import Image from "next/image";
import Link from "next/link";

export function LogoCiteUA() {
  return (
    <Link href="/">
      <Image
        width={640}
        height={175}
        className="block h-10 w-auto rounded-md"
        alt="Logo CITE Utcubamba Amazonas"
        src="/cite-ua.svg"
        quality={75}
        priority
      />
    </Link>
  );
}