"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Countdown from "./Countdown";
import GanadoresList from "./GanadoresList";
import { shuffleArray } from "@/lib/shuffle";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

export default function Formulario() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const [participants, setParticipants] = useState([]);
  const [finalWinners, setFinalWinners] = useState(null);
  const [showCountdown, setShowCountdown] = useState(false);
  const [loading, setLoading] = useState(false);

  // -------------------------
  //  HANDLE EXCEL UPLOAD
  // -------------------------
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const list = jsonData.map((row) => String(row[0]).trim()).filter(Boolean);

      setParticipants(list);
      toast.success(`Cargados ${list.length} participantes desde Excel`);
    };

    reader.readAsArrayBuffer(file);
  };

  // -------------------------
  //  HANDLE SUBMIT
  // -------------------------
  const onSubmit = (data) => {
    // Usar Excel si existe, sino usar textarea
    let list = participants.length > 0
      ? participants
      : data.participantes
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean);

    if (list.length === 0)
      return toast.error("Debes ingresar participantes o cargar un archivo");

    const winnersCount = Number(data.ganadores);

    if (list.length < winnersCount)
      return toast.error("No hay suficientes participantes");

    setShowCountdown(true);
    setLoading(true);

    setTimeout(() => {
      const shuffled = shuffleArray(list);
      const winners = shuffled.slice(0, winnersCount);

      setFinalWinners(winners);
      setParticipants(shuffled.slice(winnersCount));
      setShowCountdown(false);
      setLoading(false);

      toast.success("¡Sorteo completado!");
    }, 3500);
  };

  return (
    <div>
      {showCountdown ? (
        <Countdown onFinish={() => { }} />
      ) : finalWinners ? (
        <GanadoresList lista={finalWinners} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* TEXTAREA SOLO SI NO SE SUBIÓ ARCHIVO */}
          <textarea
            {...register("participantes", {
              validate: (value) => {
                if (participants.length > 0) return true;

                const lines = value
                  .split("\n")
                  .map(line => line.trim());

                if (lines.some(line => line === "")) {
                  return "No se permiten líneas vacías entre participantes";
                }

                if (lines.some(line => line.length > 50)) {
                  return "Máximo 50 caracteres por participante";
                }

                return true;
              }
            })}
            placeholder="Ingresa un participante por línea"
            disabled={participants.length > 0}
            className="w-full h-40 p-4 rounded-xl bg-white/20 text-black placeholder-black/50 mb-2 cursor-pointer focus:outline-none border border-gray-300"
          />

          {/* VISTA PREVIA SOLO 30 ITEMS */}
          {participants.length > 0 && (
            <div className="w-full p-4 rounded-xl bg-white/20 text-black mb-4 cursor-pointer border border-gray-300">
              <p className="text-sm font-semibold">
                Participantes cargados: {participants.length}
              </p>
              <ul className="text-sm list-disc pl-4 max-h-40 overflow-y-auto">
                {participants.slice(0, 30).map((participant, index) => (
                  <li key={index}>{participant}</li>
                ))}
              </ul>
              {participants.length > 30 && (
                <p className="text-xs text-gray-500">
                  Mostrando solo los primeros 30…
                </p>
              )}
            </div>
          )}

          {/* INPUT GANADORES */}
          <Input
            label="Número de ganadores"
            name="ganadores"
            type="number"
            placeholder="Ej: 5"
            register={register}
            errors={errors}
            rules={{
              required: "Este campo es obligatorio",
              min: { value: 5, message: "El mínimo es 5 ganadores" },
              max: { value: 100, message: "El máximo permitido es 100 ganadores" },
              pattern: {
                value: /^[0-9]{1,3}$/,
                message: "Solo permite hasta 3 dígitos"
              }
            }}
          />

          <button
            type="submit"
            className="w-full transition-all duration-300 bg-primary hover:bg-primary/80 text-white font-bold p-3 rounded-xl shadow-lg border border-gray-300 cursor-pointer"
          >
            Sortear
          </button>

          {/* INPUT ARCHIVO EXCEL */}
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileUpload}
            className="w-full mt-4 p-3 rounded-xl bg-white/20 border border-gray-300 cursor-pointer"
          />
        </form>
      )}
    </div>
  );
}