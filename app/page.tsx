import { SearchForm } from "@/components/home/search-form";

export default function Home() {
  return (
    <section className="grid items-center gap-8 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Discover Events Happening Around You
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Your ultimate guide to local concerts, sports, theater, and more. Find
          your next experience with City Pulse.
        </p>
      </div>

      <div className="w-full">
        <SearchForm />
      </div>

      {/* Search results will go here */}
    </section>
  );
}
