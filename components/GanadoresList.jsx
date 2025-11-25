"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx";
import { FiDownload } from "react-icons/fi";
import { HiOutlineTrophy } from "react-icons/hi2";
import { PiConfettiLight } from "react-icons/pi";

export default function GanadoresList({ lista }) {
    // CONFETTI ÉPICO
    useEffect(() => {
        const end = Date.now() + 1500;

        (function shoot() {
            confetti({
                particleCount: 10,
                spread: 70,
                startVelocity: 40,
                ticks: 80,
                origin: { x: Math.random(), y: Math.random() - 0.2 }
            });

            if (Date.now() < end) requestAnimationFrame(shoot);
        })();
    }, []);

    // DESCARGAR EXCEL
    const descargarExcel = () => {
        const ws = XLSX.utils.json_to_sheet(
            lista.map((ganador, i) => ({ Nro: i + 1, Ganador: ganador }))
        );
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Ganadores");

        XLSX.writeFile(wb, "ganadores.xlsx");
    };

    return (
        <div className="relative w-full flex flex-col items-center pb-10">

            {/* Glow dinámico */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 to-transparent blur-3xl" />

            {/* TITULO */}
            <motion.h2
                initial={{ opacity: 0, scale: 0.6, y: -40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl font-extrabold text-center mb-4 text-primary drop-shadow-xl flex items-center gap-2"
            >
                <PiConfettiLight className="text-4xl" /> ¡Ganadores del Sorteo! <PiConfettiLight className="text-4xl" />
            </motion.h2>

            {/* BOTÓN DESCARGAR */}
            <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                onClick={descargarExcel}
                className="mb-6 flex items-center gap-2 bg-primary hover:bg-primary/80 
                   text-white font-bold px-5 py-3 rounded-xl shadow-xl 
                   transition-all cursor-pointer active:scale-95"
            >
                <FiDownload className="text-xl" />
                Descargar Excel
            </motion.button>

            {/* BOTON DE VOLVER */}
            <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                onClick={() => window.location.reload()}
                className="mb-6 flex items-center gap-2 bg-gray-500 hover:bg-gray-600 
                   text-white font-bold px-5 py-3 rounded-xl shadow-xl 
                   transition-all cursor-pointer active:scale-95"
            >
                <FiDownload className="text-xl" />
                Volver al formulario
            </motion.button>

            {/* LISTA DE GANADORES */}
            <div className="grid w-full gap-4 overflow-y-auto max-h-80">
                <AnimatePresence>
                    {lista.map((item, index) => (
                        <motion.div
                            key={`${item}-${index}`}
                            initial={{ opacity: 0, scale: 0.6, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.15,
                                type: "spring",
                                stiffness: 220,
                            }}
                            className="relative p-5 rounded-2xl bg-white/70 backdrop-blur-xl 
                         border border-primary/40 text-center
                         text-lg font-semibold text-black overflow-hidden"
                        >
                            {/* Glow suavísimo */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50 blur-xl"></div>

                            <div className="relative flex items-center justify-center gap-2 z-10">
                                <span className="text-2xl"><HiOutlineTrophy className="text-primary" /></span>
                                <span>{item}</span>
                            </div>

                            {/* Hover shine */}
                            <motion.div
                                initial={{ translateX: "-120%" }}
                                whileHover={{ translateX: "120%" }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="absolute top-0 left-0 w-1/3 h-full 
                           bg-white/30 blur-xl rotate-12"
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            
        </div>
    );
}