"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { DatePickerWithRange } from "@/app/components/DatePickerWithRange";
import ShiftSelect from "@/app/components/ShiftSelect";
import { getAttendances } from "@/sanity/lib/query";
import { AttendanceType } from "@/sanity/lib/types";
import { startOfToday, subMonths } from "date-fns";
import { DateRange } from "react-day-picker";
import { AttendanceTable } from "@/app/components/AttendanceTable";
import { PaginationComponent } from "@/app/components/PaginationComponent";
import { AttendanceSummary } from "@/app/components/AttendanceSummary";
import AttendanceExportButton from "@/app/components/AttendanceExportButton";
import NavbarDashboard from "./NavbarDashboard";
import ConsultantSearch from "../components/ConsultantSearch";

export default function DashboardPage() {
  const [attendances, setAttendances] = useState<AttendanceType[]>([]);
  const [filteredData, setFilteredData] = useState<AttendanceType[]>([]);
  const [previousData, setPreviousData] = useState<AttendanceType[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfToday(),
    to: new Date(startOfToday().getTime() + 24 * 60 * 60 * 1000),
  });
  const [shiftFilter, setShiftFilter] = useState<string>(() => {
    const currentHour = new Date().getHours();
    return currentHour < 13 ? "morning" : "afternoon"; // Selección automática del turno
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const data = await getAttendances();
        console.log("Datos de asistencia:", data);
        setAttendances(data);
        handleFilterByDate(data); // Filtrado inicial

        const lastMonthStart = subMonths(startOfToday(), 1);
        const lastMonthEnd = new Date(
          lastMonthStart.getTime() + 24 * 60 * 60 * 1000 * 30
        );
        const previousFiltered = data.filter((item: any) => {
          const checkIn = new Date(item.checkInTime || "");
          return checkIn >= lastMonthStart && checkIn <= lastMonthEnd;
        });
        setPreviousData(previousFiltered);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchAttendances();
  }, []);

  const handleFilterByDate = useCallback((data: AttendanceType[]) => {
    const { from, to } = dateRange || {};

    const filteredByDateAndShift: AttendanceType[] = data.filter((item) => {
      const checkIn = new Date(item.checkInTime || "");
      const withinDateRange =
        from && to ? checkIn >= from && checkIn <= to : true;
      const matchesShift = shiftFilter === "both" || item.shift === shiftFilter;
      return withinDateRange && matchesShift;
    });

    // Ordenar por checkInTime
    const sortedData: AttendanceType[] = filteredByDateAndShift.sort((a, b) => {
      return (
        new Date(a.checkInTime || "").getTime() -
        new Date(b.checkInTime || "").getTime()
      );
    });

    setFilteredData(sortedData);
  }, [dateRange, shiftFilter]);

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();

    // Filtrar consultores
    const filteredByConsultant = attendances.filter((item) => {
      const consultantName = item.employee.name || "";
      return consultantName.toLowerCase().includes(lowerCaseQuery);
    });

    // Filtrar por fecha y turno
    handleFilterByDate(filteredByConsultant);
  };

  useEffect(() => {
    handleFilterByDate(attendances); // Refiltrar al cambiar fecha o turno
  }, [dateRange, shiftFilter, attendances, handleFilterByDate]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-6">
      <NavbarDashboard />
      <Card className="p-6 mb-6 mt-16">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="lg:flex gap-x-4 space-y-4 lg:space-y-0 mb-4 items-center">
          <DatePickerWithRange onSelectRange={(range) => setDateRange(range)} />
          <ShiftSelect
            selectedShift={shiftFilter}
            onShiftChange={setShiftFilter}
          />
          <ConsultantSearch onSearch={handleSearch} />
          <AttendanceExportButton
            filteredData={filteredData}
            dateRange={
              dateRange
                ? { from: dateRange.from!, to: dateRange.to! }
                : undefined
            }
            shiftFilter={shiftFilter}
          />
        </div>

        <AttendanceSummary
          filteredData={filteredData}
          previousData={previousData}
        />

        <AttendanceTable data={paginatedData} />

        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Card>
    </div>
  );
}
