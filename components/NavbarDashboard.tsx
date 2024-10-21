import { LogoCiteUA } from "@/components/Logos";
import Link from "next/link";
import { ArrowLeft } from "lucide-react"; // Asegúrate de que este icono esté importado
import { Button } from "@/components/ui/button"; // Asegúrate de que la ruta sea correcta
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function NavbarDashboard() {
  return (
    <div className="fixed top-0 left-0 right-0 z-30 bg-white dark:bg-zinc-950 border-b dark:border-zinc-800 transition-transform duration-300">
      <div className="mx-auto px-4 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <LogoCiteUA />
          <p className="text-xs text-zinc-700 dark:text-zinc-300">
            CITE <br />
            UTCUBAMBA AMAZONAS
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Link href="/" passHref>
            <Button className="flex items-center">
              <ArrowLeft className="w-5 h-5 mr-1" />
              Regresar
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
