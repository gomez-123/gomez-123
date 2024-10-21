// ShiftSelect.tsx

"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface ShiftSelectProps {
  selectedShift: string;
  onShiftChange: (value: string) => void;
}

const ShiftSelect: React.FC<ShiftSelectProps> = ({
  selectedShift,
  onShiftChange,
}) => {
  return (
    <Select onValueChange={onShiftChange} defaultValue={selectedShift}>
      <SelectTrigger>
        <SelectValue placeholder="Seleccionar Turno" className="w-full" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="both">Ambos Turnos</SelectItem>
        <SelectItem value="morning">Turno Mañana</SelectItem>
        <SelectItem value="afternoon">Turno Tarde</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ShiftSelect;
