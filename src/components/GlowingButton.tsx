import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlowingButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

const GlowingButton: React.FC<GlowingButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.button
      className={`relative px-4 py-2 bg-white bg-opacity-10 rounded-md text-white font-medium overflow-hidden group ${className}`}
      whileHover={{ boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.2)" }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <motion.span className="relative z-10 pointer-events-none">
        {children}
      </motion.span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default GlowingButton;
