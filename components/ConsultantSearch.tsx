// components/ConsultantSearch.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input"; // Asegúrate de que el Input tenga estilos apropiados
import { Search } from "lucide-react";

interface ConsultantSearchProps {
  onSearch: (query: string) => void;
}

const ConsultantSearch: React.FC<ConsultantSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value); // Llama a la función de búsqueda al cambiar el input
  };

  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Buscar consultor..."
        value={searchQuery}
        onChange={handleChange}
        className="pl-10 pr-4 py-2"
      />
      <span className="absolute left-3 top-2.5">
        <Search size={20} className="text-zinc-500" />
      </span>
    </div>
  );
};

export default ConsultantSearch;
