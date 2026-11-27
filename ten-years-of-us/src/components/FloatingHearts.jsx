
import { motion } from "framer-motion";

const hearts = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  duration: 5 + Math.random() * 5,
  delay: Math.random() * 5,
  size: 14 + Math.random() * 20,
}));

export default function FloatingHearts() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.7, 0],
            x: [0, 20, -20, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: heart.left,
            fontSize: heart.size,
          }}
          className="absolute bottom-0 text-pink-400"
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}
