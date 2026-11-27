
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

const memories = [
  {
    photo: "/photos/new_image.jpeg",
    caption: "My favourite smile ❤️",
    title: "My favourite person",
    message:
      "Sometimes I look at you and wonder how I got so lucky. Your smile can make even my hardest days feel beautiful.",
  },
  {
    photo: "/photos/photo2.jpeg",
    caption: "Our little moments 💗",
    title: "Our beautiful memories",
    message:
      "Every laugh, every silly conversation and every little adventure with you is something I want to remember forever.",
  },
  {
    photo: "/photos/photo3.jpeg",
    caption: "Always together 🥹",
    title: "You and me",
    message:
      "I don't need everything to be perfect. I just need more moments, more laughter and more memories with you.",
  },
  {
    photo: "/photos/photo4.jpeg",
    caption: "Forever my favourite 💕",
    title: "To our forever",
    message:
      "Ten years of us, and still so many beautiful chapters waiting to be written. I would choose you every single time.",
  },
];

export default function StageThreeReveal({ onContinue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);

  const nextPage = () => {
    setPage((current) => (current + 1) % memories.length);
  };

  const previousPage = () => {
    setPage((current) =>
      (current - 1 + memories.length) % memories.length
    );
  };

  const memory = memories[page];

  return (
    <section
      className="relative mx-auto mt-8 w-full max-w-5xl px-2"
      style={{ isolation: "isolate" }}
    >
      {/* Chapter 3 background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 246, 248, 0.72), rgba(255, 246, 248, 0.72)), url('/photos/bg-image.png')",
        }}
      />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <p className="text-sm font-semibold uppercase
          tracking-[0.35em] text-pink-500">
          Chapter 03
        </p>

        <h2 className="mt-3 font-serif text-4xl
          font-bold text-pink-700 sm:text-5xl">
          Our Little World ❤️
        </h2>

        <p className="mt-3 font-serif italic text-pink-500">
          A book filled with our memories.
        </p>
      </motion.div>

      {/* BOOK */}
      <div
        className="relative mx-auto w-full max-w-[760px]"
        style={{ perspective: "1800px" }}
      >
        <div
          className="relative grid grid-cols-2 overflow-hidden
            rounded-r-xl rounded-l-md bg-[#E9D8B8]
            shadow-[0_25px_55px_rgba(120,45,70,0.25)]"
          style={{
            aspectRatio: "1.65 / 1",
            transformStyle: "preserve-3d",
          }}
        >

          {/* LEFT PAGE */}
          <div className="relative flex flex-col
            items-center justify-center border-r
            border-[#D5C4A5] bg-[#FFF9E9] p-3
            sm:p-6">

            <div className="absolute left-2 top-2
              text-2xl sm:left-5 sm:top-4 sm:text-4xl">
              💗
            </div>

            <p className="mb-3 font-serif text-xs
              italic text-rose-700 sm:text-base">
              A little piece of us...
            </p>

            <motion.div
              key={memory.photo}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-[90%] max-w-[220px]
                rotate-[-3deg] bg-white p-2
                pb-5 shadow-xl sm:p-3 sm:pb-7"
            >
              <img
                src={memory.photo}
                alt={memory.caption}
                className="aspect-[4/5] w-full
                  object-cover"
              />

              <p className="mt-2 text-center
                font-serif text-[10px] italic
                text-gray-600 sm:text-sm">
                {memory.caption}
              </p>
            </motion.div>

            <p className="mt-3 font-serif text-xs
              text-rose-700 sm:text-sm">
              Forever & Always ♡
            </p>
          </div>

          {/* RIGHT PAGE */}
          <div className="relative flex flex-col
            items-center justify-center
            bg-[#FFF8E8] p-3 sm:p-7">

            <div className="mb-2 text-4xl sm:mb-4 sm:text-5xl">
              ❤️
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <h3 className="mb-3 text-center
                  font-serif text-lg font-bold
                  text-rose-800 sm:text-2xl">
                  {memory.title}
                </h3>

                <p className="font-serif text-xs
                  leading-relaxed text-rose-950
                  sm:text-base sm:leading-8">
                  {memory.message}
                </p>

                <p className="mt-4 text-right
                  font-serif text-xs italic
                  text-rose-700 sm:mt-7 sm:text-lg">
                  With all my love, ❤️
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Page controls */}
            <div className="absolute bottom-3
              flex w-full items-center
              justify-center gap-5 sm:bottom-5">

              <button
                onClick={previousPage}
                aria-label="Previous memory"
                className="rounded-full bg-rose-100
                  p-2 text-rose-700 transition
                  hover:bg-rose-200"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="text-xs font-semibold
                text-rose-600">
                {page + 1} / {memories.length}
              </span>

              <button
                onClick={nextPage}
                aria-label="Next memory"
                className="rounded-full bg-rose-100
                  p-2 text-rose-700 transition
                  hover:bg-rose-200"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* BOOK SPINE */}
          <div className="pointer-events-none absolute
            left-1/2 top-0 z-10 h-full w-3
            -translate-x-1/2 bg-gradient-to-r
            from-[#C7AA83] via-[#F5E4C6]
            to-[#C7AA83] shadow-md sm:w-5" />

          {/* FRONT COVER */}
          <motion.button
            type="button"
            onClick={() => setIsOpen(true)}
            initial={false}
            animate={{
              rotateY: isOpen ? -170 : 0,
            }}
            transition={{
              duration: 1.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
            className="absolute inset-0 z-30
              flex cursor-pointer flex-col
              items-center justify-center
              overflow-hidden rounded-r-xl
              border-[5px] border-[#B74750]
              bg-gradient-to-br from-[#EFA1A5]
              via-[#D96D79] to-[#A83249]
              shadow-xl"
          >
            <div className="absolute inset-3
              rounded-lg border border-white/60
              sm:inset-5 sm:border-2" />

            <motion.div
              animate={
                isOpen
                  ? { opacity: 0 }
                  : { opacity: 1 }
              }
              className="relative z-10 flex
                flex-col items-center px-3 text-center"
            >
              <Heart
                size={48}
                className="mb-5 fill-pink-100
                  text-pink-100 sm:size-16"
              />

              <p className="font-serif text-xs
                uppercase tracking-[0.3em]
                text-white sm:text-sm">
                A collection of
              </p>

              <h3 className="mt-3 font-serif
                text-3xl font-bold text-white
                sm:text-5xl">
                Our Memories
              </h3>

              <p className="mt-5 font-serif
                text-sm italic text-pink-50
                sm:text-lg">
                10 Years of Us
              </p>

              <div className="mt-8 rounded-full
                border border-white/70
                bg-white/15 px-5 py-2
                text-xs font-semibold
                tracking-wider text-white
                sm:text-sm">
                TAP TO OPEN ♡
              </div>
            </motion.div>
          </motion.button>

        </div>
      </div>

      {/* Instructions */}
      {!isOpen ? (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-8 text-center
            font-serif italic text-pink-600"
        >
          Open this little book of memories... 💌
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <p className="font-serif italic text-pink-600">
            Every page holds a little piece of my heart. 💗
          </p>

          <button
            onClick={onContinue}
            className="mt-6 rounded-full
              bg-gradient-to-r from-pink-500
              to-rose-400 px-9 py-4
              font-semibold text-white
              shadow-lg transition
              hover:scale-105"
          >
            Continue to Gift 4 ❤️ →
          </button>
        </motion.div>
      )}

    </section>
  );
}
