"use client";

import Formulario from "@/components/Formulario";

export default function Inicio() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex w-full max-w-3xl flex-col items-center justify-start bg-white shadow-lg rounded-xl">
        <div className="w-full mt-6">
          <Formulario />
        </div>
      </main>
    </div>
  );
}