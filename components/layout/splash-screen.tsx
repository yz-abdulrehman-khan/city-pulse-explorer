import { Ticket } from "lucide-react";

export function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="flex items-center space-x-2">
        <Ticket className="h-8 w-8 animate-pulse" />
        <span className="text-xl font-bold">City Pulse</span>
      </div>
    </div>
  );
}
