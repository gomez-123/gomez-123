// app/page.tsx

import { Metadata } from "next";
import AttendanceForm from "../components/AttendanceForm";

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
