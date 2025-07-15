import Link from "next/link";
import { Ticket } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center px-6 sm:px-8 md:px-10">
        <Link href="/" className="flex items-center space-x-2">
          <Ticket className="h-6 w-6" />
          <span className="font-bold">City Pulse</span>
        </Link>
      </div>
    </header>
  );
}
