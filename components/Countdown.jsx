"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Countdown({ onFinish }) {
    const [count, setCount] = useState(3);
    const [flash, setFlash] = useState(false);
    const [boom, setBoom] = useState(false);

    useEffect(() => {
        if (count === 0) {
            // Activa explosión y dispara onFinish después del efecto
            setBoom(true);

            setTimeout(() => {
                setBoom(false);
                onFinish();
            }, 800);

            return;
        }

        const timer = setTimeout(() => {
            setFlash(true);
            setTimeout(() => setFlash(false), 180);

            setCount((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [count]);

    return (
        <div className="flex items-center justify-center h-80 relative overflow-hidden p-10">

            {/* Glow suave de fondo */}
            <div className="absolute inset-0 bg-primary/10 blur-3xl animate-pulse" />

            {/* Partículas flotando normalmente */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 0,
                        scale: 0,
                        x: Math.random() * 200 - 100,
                        y: Math.random() * 200 - 100,
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.2, 0],
                    }}
                    transition={{
                        duration: 2,
                        delay: Math.random() * 1,
                        repeat: Infinity,
                        ease: "easeOut",
                    }}
                    className="absolute w-2 h-2 bg-primary rounded-full blur-[2px]"
                />
            ))}

            {/* FLASH épico */}
            {flash && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-white/60"
                />
            )}

            {/* EXPLOSIÓN FINAL */}
            {boom && (
                <>
                    {/* Flash más fuerte */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-white/80 z-20"
                    />

                    {/* Partículas explosivas */}
                    {[...Array(40)].map((_, i) => (
                        <motion.div
                            key={`boom-${i}`}
                            initial={{
                                opacity: 1,
                                scale: 0.6,
                                x: 0,
                                y: 0,
                            }}
                            animate={{
                                opacity: 0,
                                scale: 1.8,
                                x: (Math.random() - 0.5) * 500,
                                y: (Math.random() - 0.5) * 500,
                            }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                            }}
                            className="absolute w-3 h-3 bg-primary rounded-full blur-[2px] z-20"
                        />
                    ))}

                    {/* Shake / vibración final */}
                    <motion.div
                        className="absolute inset-0 z-30"
                        initial={{ x: 0 }}
                        animate={{ x: [-10, 10, -6, 6, -3, 3, 0] }}
                        transition={{ duration: 0.4 }}
                    />
                </>
            )}

            {/* NÚMERO ANIMADO */}
            <AnimatePresence mode="wait">
                {count > 0 && (
                    <motion.div
                        key={count}
                        initial={{ scale: 0.2, opacity: 0, rotateX: 180 }}
                        animate={{
                            scale: 2,
                            opacity: 1,
                            rotateX: 0,
                            transition: {
                                duration: 0.7,
                                ease: "easeOut",
                            },
                        }}
                        exit={{
                            scale: 0,
                            opacity: 0,
                            rotateX: -120,
                            transition: {
                                duration: 0.4,
                                ease: "easeIn",
                            },
                        }}
                        className="text-[130px] font-extrabold text-primary drop-shadow-[0_0_40px_rgba(0,0,0,0.45)]"
                    >
                        {count}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}