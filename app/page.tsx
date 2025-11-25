"use client";

import Logo from "@/components/Logo";
import Formulario from "@/components/Formulario";

export default function Inicio() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex w-full max-w-3xl flex-col items-center justify-start py-20 px-8 bg-white shadow-lg rounded-xl">
        <Logo />
        <div className="w-full mt-6">
          <Formulario />
        </div>
      </main>
    </div>
  );
}