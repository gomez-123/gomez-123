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
    if (previous === 0) return current * 100; // Evitar división por cero
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {/* Card A tiempo */}
      <Card className="p-4 shadow-md rounded-lg border border-zinc-100 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-medium text-zinc-700">A tiempo</h2>
            <p className="text-3xl font-semibold text-black">+{totalOnTime}</p>
            <p className="text-xs text-zinc-500 mt-1">
              {percentageOnTime >= 0
                ? `+${percentageOnTime.toFixed(1)}%`
                : `${percentageOnTime.toFixed(1)}%`}{" "}
              desde el último mes
            </p>
          </div>
          <BadgeCheck className="w-6 h-6 text-zinc-500" />
        </div>
      </Card>

      {/* Card Tardanzas */}
      <Card className="p-4 shadow-md rounded-lg border border-zinc-100 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-medium text-zinc-700">Tardanzas</h2>
            <p className="text-3xl font-semibold text-black">+{totalLate}</p>
            <p className="text-xs text-zinc-500 mt-1">
              {percentageLate >= 0
                ? `+${percentageLate.toFixed(1)}%`
                : `${percentageLate.toFixed(1)}%`}{" "}
              desde el último mes
            </p>
          </div>
          <Clock className="w-6 h-6 text-zinc-500" />
        </div>
      </Card>

      {/* Card Permisos */}
      <Card className="p-4 shadow-md rounded-lg border border-zinc-100 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-medium text-zinc-700">Permisos</h2>
            <p className="text-3xl font-semibold text-black">
              +{totalPermissions}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              {percentagePermissions >= 0
                ? `+${percentagePermissions.toFixed(1)}%`
                : `${percentagePermissions.toFixed(1)}%`}{" "}
              desde el último mes
            </p>
          </div>
          <Briefcase className="w-6 h-6 text-zinc-500" />
        </div>
      </Card>

      {/* Card Salidas a campo */}
      <Card className="p-4 shadow-md rounded-lg border border-zinc-100 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-medium text-zinc-700">
              Salidas a campo
            </h2>
            <p className="text-3xl font-semibold text-black">
              +{totalFieldTrips}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              {percentageFieldTrips >= 0
                ? `+${percentageFieldTrips.toFixed(1)}%`
                : `${percentageFieldTrips.toFixed(1)}%`}{" "}
              desde el último mes
            </p>
          </div>
          <Flag className="w-6 h-6 text-zinc-500" />
        </div>
      </Card>
    </div>
  );
};
