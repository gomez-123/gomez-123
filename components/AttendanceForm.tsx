"use client";

import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogoCiteUA } from "./Logos";

export default function AttendanceForm() {
  const [dni, setDNI] = useState<number | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      },
      (error) => {
        setError("No se pudo obtener la ubicación, active la ubicación");
      }
    );

    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!lat || !lon) {
      setError("No se pudo obtener la ubicación");
      setLoading(false);
      return;
    }

    if (!dni || dni.toString().length !== 8) {
      setError("El DNI debe tener exactamente 8 números.");
      setLoading(false);
      return;
    }

    const data = {
      dni: dni.toString(),
      lat,
      lon,
    };

    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Error al registrar la asistencia");
      }

      setSuccess(result.message);
      setDNI(null);
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 mx-auto bg-zinc-50 dark:bg-zinc-900 min-h-screen px-6 lg:px-8">
      <div className="flex flex-col items-center w-full mx-auto">
        <div className="flex justify-center">
          <LogoCiteUA />
        </div>
        <p className="text-xs text-zinc-700 mt-3 dark:text-zinc-300 text-center uppercase font-medium">
          CITE <br /> Utcubamba Amazonas
        </p>
      </div>

      <Card className="max-w-md mx-auto mt-10 p-6 dark:bg-zinc-800 shadow-lg">
        <h1 className="text-xl font-medium mb-6 text-zinc-900 dark:text-zinc-100 text-center">
          Registro de Asistencia
        </h1>
        <div className="mb-4 text-center">
          <p className="text-lg text-zinc-700 dark:text-zinc-300">
            Hora actual: <span className="font-bold">{currentTime}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label
              htmlFor="dni"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              DNI
            </label>
            <Input
              type="tel"
              inputMode="numeric"
              id="dni"
              value={dni || ""}
              onChange={(e) =>
                setDNI(parseInt(e.target.value.replace(/[^0-9]/g, "")))
              }
              className="mt-1"
              placeholder="Ingresa tu DNI"
              required
              maxLength={8}
            />
          </div>

          {/* Notificaciones de Error y Éxito */}
          <div className="mt-4">
            {error && (
              <div className="flex items-center justify-center p-4 mb-4 text-red-700 bg-red-100 dark:bg-red-600 dark:text-red-100 rounded-lg">
                <AlertCircle className="w-5 h-5 mr-2" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="flex items-center justify-center p-4 mb-4 text-green-700 bg-green-100 dark:bg-green-600 dark:text-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 mr-2" />
                <p className="text-sm">{success}</p>
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white rounded-md shadow-md transition duration-200 flex items-center justify-center ${
              loading
                ? "bg-zinc-400 dark:bg-zinc-600"
                : "bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-6 w-6 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M12 2a10 10 0 0110 10h-4a6 6 0 00-6-6V2z"
                  ></path>
                </svg>
                Registrando...
              </>
            ) : (
              "Registrar Asistencia"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
