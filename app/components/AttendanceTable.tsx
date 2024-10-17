import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { AttendanceType } from "@/sanity/lib/types";

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

interface AttendanceTableProps {
  data: AttendanceType[];
}

export function AttendanceTable({ data }: AttendanceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Consultor</TableCell>
          <TableCell>DNI</TableCell>
          <TableCell>Turno</TableCell>
          <TableCell>Estado</TableCell>
          <TableCell>Hora de Entrada</TableCell>
          <TableCell>Asociación Visitada</TableCell>
          <TableCell>Detalles del Permiso</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={item.employee.mainImage?.url || ""}
                    alt={item.employee.name}
                  />
                  <AvatarFallback>{item.employee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {item.employee.name}
              </TableCell>
              <TableCell>{item.employee.dni}</TableCell>
              <TableCell>{shiftMap[item.shift] || item.shift}</TableCell>
              <TableCell>{statusMap[item.status] || item.status}</TableCell>
              <TableCell>
                {item.checkInTime
                  ? format(new Date(item.checkInTime), "dd/MM/yyyy HH:mm")
                  : "N/A"}
              </TableCell>
              <TableCell>{item.associationVisit?.title || "N/A"}</TableCell>
              <TableCell>{item.permissionDetails || "N/A"}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8}>No hay datos disponibles</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
