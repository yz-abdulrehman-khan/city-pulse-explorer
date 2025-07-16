import { Search, User } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-6 sm:px-8 md:px-10">
        <Link href="/" className="flex items-center space-x-2">
          <Search className="h-6 w-6" />
          <span className="font-bold">City Pulse</span>
        </Link>
        <nav>
          <Link
            href="/profile"
            className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <User className="mr-2 h-5 w-5" />
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
}
