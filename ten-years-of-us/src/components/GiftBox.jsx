
import { motion, AnimatePresence } from "framer-motion";

const hearts = [
  { x: -130, y: -130, rotate: -25, size: 35 },
  { x: 130, y: -150, rotate: 25, size: 30 },
  { x: -80, y: -210, rotate: -15, size: 28 },
  { x: 90, y: -230, rotate: 20, size: 38 },
  { x: -160, y: -40, rotate: -30, size: 25 },
  { x: 160, y: -70, rotate: 30, size: 32 },
  { x: 0, y: -250, rotate: 10, size: 40 },
  { x: 50, y: -120, rotate: -10, size: 24 },
];

export default function GiftBox({ opened, onOpen }) {
  return (
    <div
  onClick={!opened ? onOpen : undefined}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (!opened && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onOpen();
    }
  }}
  className="relative flex h-[320px] w-[320px]
    items-center justify-center cursor-pointer"
  style={{ perspective: "1000px" }}
>

      {/* HEART EXPLOSION */}
      <AnimatePresence>
        {opened && hearts.map((heart, index) => (
          <motion.div
            key={index}
            initial={{
              x: 0,
              y: 30,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              x: heart.x,
              y: heart.y,
              scale: [0, 1.5, 1],
              opacity: [0, 1, 0],
              rotate: heart.rotate,
            }}
            transition={{
              duration: 2.5,
              delay: index * 0.08,
              ease: "easeOut",
            }}
            className="pointer-events-none absolute z-40"
            style={{ fontSize: heart.size }}
          >
            💗
          </motion.div>
        ))}
      </AnimatePresence>

      {/* BIG HEART RISING FROM BOX */}
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ y: 50, scale: 0, opacity: 0 }}
            animate={{
              y: -180,
              scale: [0, 1.5, 1.2],
              opacity: [0, 1, 1],
            }}
            transition={{
              duration: 2,
              ease: "easeOut",
            }}
            className="absolute z-30 text-7xl"
          >
            💖
          </motion.div>
        )}
      </AnimatePresence>

      {/* GIFT SHADOW */}
      <div className="absolute bottom-8 h-8 w-64
        rounded-full bg-pink-900/20 blur-xl" />

      {/* GIFT BODY */}
      <div
        className="absolute bottom-10 z-10
          h-40 w-56 overflow-hidden rounded-b-2xl
          border border-pink-300
          bg-gradient-to-br from-pink-300
          via-pink-400 to-pink-600 shadow-2xl"
      >
        {/* Vertical ribbon */}
        <div className="absolute left-1/2 h-full w-9
          -translate-x-1/2 bg-white/80" />

        {/* Horizontal ribbon */}
        <div className="absolute top-1/2 h-8 w-full
          -translate-y-1/2 bg-pink-100" />
      </div>

      {/* OPENING LID */}
      <motion.div
        onClick={!opened ? onOpen : undefined}
        initial={false}
        animate={
          opened
            ? {
                y: -100,
                rotateX: -115,
                rotateZ: -18,
                opacity: 0.9,
              }
            : {
                y: 0,
                rotateX: 0,
                rotateZ: 0,
                opacity: 1,
              }
        }
        whileHover={!opened ? { scale: 1.04 } : {}}
        whileTap={!opened ? { scale: 0.96 } : {}}
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute bottom-[175px] z-50
          h-12 w-[250px] cursor-pointer
          rounded-xl border border-pink-200
          bg-gradient-to-r from-pink-400
          via-pink-200 to-pink-500 shadow-xl"
        style={{
          transformOrigin: "center bottom",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Ribbon */}
        <div className="absolute left-1/2 h-full w-9
          -translate-x-1/2 bg-white/90" />

        {/* Bow */}
        <div className="absolute -top-9 left-1/2
          flex -translate-x-1/2">
          <span className="h-12 w-12 rotate-[-35deg]
            rounded-full border-4 border-pink-100
            bg-pink-400" />
          <span className="h-12 w-12 rotate-[35deg]
            rounded-full border-4 border-pink-100
            bg-pink-400" />
        </div>
      </motion.div>

      {/* TAP INSTRUCTION */}
      {!opened && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-0 z-50
            whitespace-nowrap text-sm font-bold
            tracking-widest text-pink-600"
        >
          💗 TAP TO OPEN 💗
        </motion.p>
      )}
    </div>
  );
}
