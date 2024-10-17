import { NextResponse } from "next/server";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { DateTime } from "luxon"; // Importar Luxon para manejo de zonas horarias

// Variables de entorno definidas
const WORK_COORDINATES = {
  lat: parseFloat(process.env.NEXT_PUBLIC_WORK_LAT || "0"),
  lon: parseFloat(process.env.NEXT_PUBLIC_WORK_LON || "0"),
};
const ALLOWED_RADIUS = parseFloat(
  process.env.NEXT_PUBLIC_ALLOWED_RADIUS || "100"
);

// Obtener empleado desde Sanity
async function getEmployee(dni: number) {
  const query = groq`*[_type == "employee" && dni == $dni][0]`;
  return await client.fetch(query, { dni: dni.toString() });
}

// Obtener asistencia existente para el empleado y turno específico
async function getExistingAttendance(employeeId: string, shift: string) {
  const today = DateTime.now().setZone("America/Lima").toISODate(); // Obtener la fecha actual
  const query = groq`
    *[_type == "attendance" && employee._ref == $employeeId && shift == $shift && checkInTime >= $today + "T00:00:00Z" && checkInTime < $today + "T23:59:59Z"]{
      status
    }
  `;
  return await client.fetch(query, { employeeId, shift, today });
}

// Validar DNI (8 dígitos)
function validateDNI(dni: number) {
  return dni.toString().length === 8 && !isNaN(dni);
}

// Calcular la distancia entre dos coordenadas en metros
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371000; // Radio de la Tierra en metros
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distancia en metros
}

// Validar geolocalización del usuario dentro del radio permitido
function validateGeolocation(userLat: number, userLon: number) {
  const distance = calculateDistance(
    WORK_COORDINATES.lat,
    WORK_COORDINATES.lon,
    userLat,
    userLon
  );
  return distance <= ALLOWED_RADIUS;
}

// Determinar el turno automáticamente basado en la hora actual (zona horaria de Perú)
function getShift() {
  const currentTime = DateTime.now().setZone("America/Lima");
  const hours = currentTime.hour;
  const minutes = currentTime.minute;

  if (hours >= 5 && (hours < 13 || (hours === 12 && minutes < 60))) {
    return "morning"; // Turno de mañana
  }
  if (hours >= 13 && (hours < 18 || (hours === 17 && minutes < 60))) {
    return "afternoon"; // Turno de tarde
  }
  return null; // Fuera de horario de trabajo
}

export async function POST(req: Request) {
  const { dni, lat, lon } = await req.json();

  // Validar que DNI sea un número
  const dniNumber = Number(dni);
  if (!validateDNI(dniNumber)) {
    return NextResponse.json({ error: "DNI inválido" }, { status: 400 });
  }

  // Buscar empleado en Sanity
  const employee = await getEmployee(dniNumber);
  if (!employee) {
    return NextResponse.json(
      { error: "Consultor no encontrado" },
      { status: 404 }
    );
  }

  // Validar geolocalización
  if (!validateGeolocation(lat, lon)) {
    return NextResponse.json(
      { error: "Fuera del rango de la oficina" },
      { status: 400 }
    );
  }

  // Determinar el turno actual
  const shift = getShift();
  if (!shift) {
    return NextResponse.json(
      { error: "No es tiempo de un turno" },
      { status: 400 }
    );
  }

  // Verificar si ya existe un registro de asistencia para este empleado y turno en el día actual
  const existingAttendances = await getExistingAttendance(employee._id, shift);
  if (existingAttendances.length > 0) {
    return NextResponse.json(
      { error: "Ya se ha registrado asistencia para este turno" },
      { status: 400 }
    );
  }

  const now = DateTime.now().setZone("America/Lima"); // Hora actual en Lima
  const hours = now.hour;
  const minutes = now.minute;

  let status;

  // Lógica para determinar si está tarde
  if (shift === "morning") {
    // Puntual en la mañana (antes de las 9:00 AM)
    if (hours < 8 || (hours === 8 && minutes <= 30)) {
      status = "on-time";
    } else {
      status = "late"; // Tarde después de las 8:30 AM
    }
  } else if (shift === "afternoon") {
    // Puntual en la tarde (antes de las 3:00 PM)
    if (hours < 15 || (hours === 15 && minutes <= 0)) {
      status = "on-time";
    } else {
      status = "late"; // Tarde después de las 3:00 PM
    }
  }

  // Crear registro de asistencia en Sanity
  const newAttendance = {
    _type: "attendance",
    employee: { _type: "reference", _ref: employee._id },
    checkInTime: now.toISO(),
    shift,
    status,
  };

  await client.create(newAttendance);

  return NextResponse.json({
    message: "Asistencia registrada correctamente",
    status,
  });
}
