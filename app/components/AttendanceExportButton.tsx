// components/AttendanceExportButton.tsx

import { Button } from "@/components/ui/button";
import { CSVLink } from "react-csv";
import { useMemo } from "react";
import * as XLSX from "xlsx";

// Define los mapas para la traducción de Turno y Estado
const shiftMap: { [key: string]: string } = {
  morning: "Mañana",
  afternoon: "Tarde",
};

const statusMap: { [key: string]: string } = {
  "on-time": "A tiempo",
  late: "Tarde",
  permission: "Permiso",
  "field-trip": "Salida a campo",
};

interface AttendanceExportButtonProps {
  filteredData: any[]; // Cambia `any` por el tipo adecuado si lo conoces
  dateRange?: { from: Date; to: Date }; // Cambia a `dateRange?`
  shiftFilter: string;
}

const AttendanceExportButton: React.FC<AttendanceExportButtonProps> = ({
  filteredData,
  dateRange,
  shiftFilter,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Formato de 24 horas
    });
  };

  const csvData = useMemo(() => {
    return filteredData.map((item) => ({
      Empleado: item.employee.name,
      DNI: item.employee.dni,
      Turno: shiftMap[item.shift] || item.shift, // Traduce el turno al español
      Estado: statusMap[item.status] || item.status, // Traduce el estado al español
      Fecha: formatDate(item.checkInTime), // Formatea la fecha de entrada
      Hora: formatTime(item.checkInTime), // Formatea la hora de entrada
      "Asociación Visitada": item.associationVisit?.title || "N/A",
      "Detalles del permiso": item.permissionDetails || "N/A",
    }));
  }, [filteredData]);

  const handleExcelExport = () => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Asistencias");

    // Formato de fecha para el nombre del archivo
    const fromDate =
      dateRange?.from?.toISOString().split("T")[0] || "fecha_desconocida";
    const toDate =
      dateRange?.to?.toISOString().split("T")[0] || "fecha_desconocida";

    // Exportar el archivo Excel
    XLSX.writeFile(wb, `asistencias_${fromDate}_${toDate}.xlsx`);
  };

  return (
    <div className="flex">
      <Button asChild>
        <CSVLink
          data={csvData}
          filename={`asistencias_${dateRange?.from?.toISOString().split("T")[0]}_${dateRange?.to?.toISOString().split("T")[0]}.csv`}
        >
          Exportar CSV
        </CSVLink>
      </Button>
      <Button onClick={handleExcelExport} className="ml-2">
        Exportar Excel
      </Button>
    </div>
  );
};

export default AttendanceExportButton;
