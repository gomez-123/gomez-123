import { LogoCiteUA } from "@/components/Logos";

export default function NavbarDashboard() {
  return (
    <div className="fixed top-0 left-0 right-0 z-30 bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 transition-transform duration-300">
      <div className="mx-auto px-6 lg:px-8 flex h-16">
        <div className="flex flex-1 items-center justify-start">
          <div className="items-center w-full flex space-x-2">
            <LogoCiteUA />
            <p className="text-xs text-zinc-700 dark:text-zinc-300">
              CITE <br />
              UTCUBAMBA AMAZONAS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
