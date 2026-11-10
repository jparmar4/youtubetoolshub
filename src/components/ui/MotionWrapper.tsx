"use client";

import { MotionConfig, motion } from "framer-motion";
import { ReactNode } from "react";

export default function MotionWrapper({ children }: { children: ReactNode }) {
    return (
        <MotionConfig reducedMotion="user">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </MotionConfig>
    );
}
