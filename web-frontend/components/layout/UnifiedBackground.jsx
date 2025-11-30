import React from 'react';
import { motion } from 'framer-motion';
import StarField from '../animations/StarField';

const UnifiedBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050505] [perspective:1000px]">
            {/* Star Field */}
            <StarField count={150} speed={0.3} />

            {/* 3D Grid Floor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200vw] h-[100vh] bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:rotateX(70deg)_translateZ(0)] origin-bottom"
                    style={{
                        maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)'
                    }}
                />
            </div>

            {/* Horizon Glow */}
            <div className="absolute bottom-[-10%] left-0 right-0 h-[50vh] bg-brand-accent/20 blur-[120px] rounded-[100%] pointer-events-none mix-blend-screen" />

            {/* Top Atmosphere */}
            <div className="absolute top-[-20%] left-0 right-0 h-[50vh] bg-brand-glow/10 blur-[100px] rounded-[100%] pointer-events-none" />

            {/* Grid Pattern (Original) - kept for subtle texture if needed, or can be removed if 3D grid is enough. Keeping for now as they are distinct. */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            {/* Animated Gradient Blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-brand-accent/10 blur-[120px]"
            />

            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-brand-glow/10 blur-[100px]"
            />

            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
                className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[100px]"
            />
        </div>
    );
};

export default UnifiedBackground;
