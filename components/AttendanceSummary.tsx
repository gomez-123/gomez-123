import { Card } from "@/components/ui/card";
import { BadgeCheck, Clock, Briefcase, Flag } from "lucide-react";
import { AttendanceType } from "@/sanity/lib/types";

interface AttendanceSummaryProps {
  filteredData: AttendanceType[];
  previousData: AttendanceType[]; // Datos previos para calcular los porcentajes
}

export const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({
  filteredData,
  previousData,
}) => {
  // Función para calcular el porcentaje de cambio
  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0 && current === 0) return null; // No hay datos para comparar
    if (previous === 0) return current * 100; // Si no hay datos anteriores, el crecimiento es total
    return ((current - previous) / previous) * 100;
  };

  // Totales actuales
  const totalOnTime = filteredData.filter(
    (item) => item.status === "on-time"
  ).length;
  const totalLate = filteredData.filter(
    (item) => item.status === "late"
  ).length;
  const totalPermissions = filteredData.filter(
    (item) => item.status === "permission"
  ).length;
  const totalFieldTrips = filteredData.filter(
    (item) => item.status === "field-trip"
  ).length;

  // Totales previos
  const previousOnTime = previousData.filter(
    (item) => item.status === "on-time"
  ).length;
  const previousLate = previousData.filter(
    (item) => item.status === "late"
  ).length;
  const previousPermissions = previousData.filter(
    (item) => item.status === "permission"
  ).length;
  const previousFieldTrips = previousData.filter(
    (item) => item.status === "field-trip"
  ).length;

  // Calcular porcentajes
  const percentageOnTime = calculatePercentageChange(
    totalOnTime,
    previousOnTime
  );
  const percentageLate = calculatePercentageChange(totalLate, previousLate);
  const percentagePermissions = calculatePercentageChange(
    totalPermissions,
    previousPermissions
  );
  const percentageFieldTrips = calculatePercentageChange(
    totalFieldTrips,
    previousFieldTrips
  );

  // Función para mostrar el texto correcto
  const renderPercentageText = (percentage: number | null) => {
    if (percentage === null) return "Sin datos previos";
    return percentage >= 0
      ? `+${percentage.toFixed(1)}%`
      : `${percentage.toFixed(1)}%`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {/* Card A tiempo */}
      <Card className="p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-medium">A tiempo</h2>
            <p className="text-3xl font-semibold">{totalOnTime}</p>
            <p className="text-xs text-zinc-500 mt-1">
              {renderPercentageText(percentageOnTime)} respecto al periodo anterior
            </p>
          </div>
          <BadgeCheck strokeWidth={1.5} className="w-6 h-6" />
        </div>
      </Card>

      {/* Card Tardanzas */}
      <Card className="p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-medium">Tardanzas</h2>
            <p className="text-3xl font-semibold">{totalLate}</p>
            <p className="text-xs text-zinc-500 mt-1">
              {renderPercentageText(percentageLate)} respecto al periodo anterior
            </p>
          </div>
          <Clock strokeWidth={1.5} className="w-6 h-6" />
        </div>
      </Card>

      {/* Card Permisos */}
      <Card className="p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-medium">Permisos</h2>
            <p className="text-3xl font-semibold">
              {totalPermissions}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              {renderPercentageText(percentagePermissions)} respecto al periodo anterior
            </p>
          </div>
          <Briefcase strokeWidth={1.5} className="w-6 h-6" />
        </div>
      </Card>

      {/* Card Salidas a campo */}
      <Card className="p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-medium">Salidas a campo</h2>
            <p className="text-3xl font-semibold">
              {totalFieldTrips}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              {renderPercentageText(percentageFieldTrips)} respecto al periodo anterior
            </p>
          </div>
          <Flag strokeWidth={1.5} className="w-6 h-6" />
        </div>
      </Card>
    </div>
  );
};
