import AttendanceForm from "@/components/AttendanceForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asistencia",
  description:
    "Registro de asistencia de consultores de CITE Utcubamba Amazonas.",
};

export default function AttendancePage() {
  return (
    <>
      <AttendanceForm />
    </>
  );
}
