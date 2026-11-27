
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CupidIntro({ onContinue }) {
  const [shot, setShot] = useState(false);
  const [popped, setPopped] = useState(false);

  return (
    <div className="relative z-10 flex min-h-[75vh] w-full
      flex-col items-center justify-center overflow-hidden">

      {/* Heading */}
      <div className="absolute top-8 z-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase
          tracking-[0.4em] text-pink-500">
          A little surprise awaits
        </p>

        <h1 className="font-serif text-4xl font-bold
          text-pink-700 sm:text-6xl">
          10 Years of Us
        </h1>

        {!popped && (
          <p className="mt-4 text-pink-600">
            Cupid has something special for you! 💗
          </p>
        )}
      </div>

      {/* Balloon */}
      <AnimatePresence>
        {!popped && (
          <motion.div
            className="absolute right-[12%] top-[28%]
              flex flex-col items-center sm:right-[20%]"
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="relative flex h-36 w-28
                items-center justify-center rounded-[50%]
                bg-gradient-to-br from-pink-300
                via-pink-500 to-rose-600 shadow-2xl
                shadow-pink-400/50 sm:h-48 sm:w-36"
              exit={{
                scale: 1.8,
                opacity: 0,
                rotate: 25,
                transition: { duration: 0.2 },
              }}
            >
              <div className="absolute left-6 top-7 h-12
                w-5 rotate-[-25deg] rounded-full
                bg-white/40 blur-sm" />

              <span className="text-5xl">❤️</span>
            </motion.div>

            <div className="h-0 w-0 border-x-[9px]
              border-t-[15px] border-x-transparent
              border-t-rose-600" />

            <div className="h-20 w-px bg-pink-400" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cupid at bottom-left */}
      {!popped && (
        <motion.div
          className="absolute bottom-[8%] left-[5%]
            flex flex-col items-center sm:left-[10%]"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-7xl sm:text-9xl">
            👼
          </div>

          <div className="text-5xl">
            🏹
          </div>

          <p className="mt-2 text-sm font-semibold
            text-pink-600">
            Cupid is ready!
          </p>
        </motion.div>
      )}

      {/* Shoot button */}
      {!shot && !popped && (
        <motion.button
          onClick={() => setShot(true)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-[5%] right-[8%]
            rounded-full bg-gradient-to-r from-pink-500
            to-rose-500 px-7 py-3 font-semibold
            text-white shadow-lg shadow-pink-300"
        >
          Shoot the arrow 💘
        </motion.button>
      )}

      {/* Arrow flying from bottom-left to balloon */}
      {shot && !popped && (
        <motion.div
          className="absolute z-30 text-5xl sm:text-6xl"
          initial={{
            left: "18%",
            top: "78%",
            rotate: -35,
            scale: 0.8,
          }}
          animate={{
            left: "76%",
            top: "34%",
            rotate: -35,
            scale: 1.2,
          }}
          transition={{
            duration: 1.1,
            ease: "easeIn",
          }}
          onAnimationComplete={() => setPopped(true)}
        >
          ➶
        </motion.div>
      )}

      {/* Balloon burst */}
      <AnimatePresence>
        {popped && (
          <>
            <motion.div
              className="absolute right-[18%] top-[28%]
                z-20 text-7xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0.5, 2, 0],
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 0.7 }}
            >
              💥
            </motion.div>

            {/* Heart particles */}
            {Array.from({ length: 14 }).map((_, index) => (
              <motion.div
                key={index}
                className="pointer-events-none absolute
                  right-[22%] top-[32%] text-2xl"
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                animate={{
                  x: Math.cos(index * 0.45) * 170,
                  y: Math.sin(index * 0.45) * 140,
                  opacity: 0,
                  scale: 1.5,
                }}
                transition={{
                  duration: 1.3,
                  ease: "easeOut",
                }}
              >
                {index % 2 === 0 ? "💗" : "✨"}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Romantic message */}
      <AnimatePresence>
        {popped && (
          <motion.div
            className="relative z-20 mx-auto mt-24
              max-w-2xl px-5 text-center"
            initial={{ opacity: 0, y: 35, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.65, duration: 0.9 }}
          >
            <motion.div
              className="mb-5 text-6xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💖
            </motion.div>

            <h2 className="font-serif text-3xl font-bold
              leading-relaxed text-pink-700 sm:text-5xl">
              10 years, countless memories,
              and a million reasons to love you.
            </h2>

            <p className="mt-5 text-lg italic text-pink-600">
              And this is just another chapter of our story. ❤️
            </p>

            <motion.button
              onClick={onContinue}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className="mt-9 rounded-full
                bg-gradient-to-r from-pink-500
                to-rose-500 px-8 py-4 font-semibold
                text-white shadow-lg"
            >
              Continue to our story 💗
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
