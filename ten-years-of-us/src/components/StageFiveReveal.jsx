
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  Lock,
  Unlock,
  Sparkles,
  KeyRound,
  RotateCcw,
} from "lucide-react";

const clues = [
  {
    number: "01",
    title: "The First Secret",
    question: "What is the one thing that can make my worst day better without saying a single word?",
    options: ["A gift", "Your smile", "A holiday"],
    answer: "Your smile",
    success: "Exactly! Your smile has always been my favourite magic. ❤️",
  },
  {
    number: "02",
    title: "The Second Secret",
    question: "What is something I never get tired of sharing with you?",
    options: ["My laughter", "My snacks", "My phone"],
    answer: "My laughter",
    success: "Correct! Every laugh with you becomes a memory. 💗",
  },
  {
    number: "03",
    title: "The Final Secret",
    question: "If I could choose one person to spend all my tomorrows with, who would it be?",
    options: ["A stranger", "A celebrity", "You"],
    answer: "You",
    success: "Always you. Today, tomorrow, and forever. 💞",
  },
];

export default function StageFiveReveal() {
  const [currentClue, setCurrentClue] = useState(0);
  const [solved, setSolved] = useState([]);
  const [opened, setOpened] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const allSolved = solved.length === clues.length;
  const clue = clues[currentClue];

  const handleAnswer = (option) => {
    if (option !== clue.answer) {
      setWrongAnswer(true);
      setShowSuccess(false);
      return;
    }

    setWrongAnswer(false);
    setShowSuccess(true);

    const updatedSolved = [...solved, currentClue];
    setSolved(updatedSolved);

    if (updatedSolved.length === clues.length) {
      setTimeout(() => {
        setOpened(true);
      }, 1100);
    } else {
      setTimeout(() => {
        setCurrentClue((previous) => previous + 1);
        setShowSuccess(false);
      }, 1400);
    }
  };

  const restart = () => {
    setCurrentClue(0);
    setSolved([]);
    setOpened(false);
    setWrongAnswer(false);
    setShowSuccess(false);
  };

  return (
    <section className="relative w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#32112f] via-[#702448] to-[#32112f] px-4 py-12 text-white shadow-2xl sm:px-8">

      {/* Magical background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 22 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute text-pink-200/50"
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${(index * 53) % 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + (index % 3),
              repeat: Infinity,
              delay: index * 0.12,
            }}
          >
            <Sparkles size={12 + (index % 3) * 7} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">

        {/* Heading */}
        <div className="text-center">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-200/30 bg-white/10 px-4 py-2 text-xs tracking-[0.25em] text-pink-100 uppercase"
          >
            <KeyRound size={15} />
            The final chapter
          </motion.div>

          <h2 className="font-serif text-4xl font-bold text-pink-100 sm:text-6xl">
            The Last Treasure
          </h2>

          <p className="mt-3 text-sm text-pink-200/80 sm:text-base">
            Three little secrets stand between you and your surprise.
          </p>
        </div>

        {/* Progress */}
        <div className="mx-auto mt-8 max-w-md">
          <div className="mb-3 flex justify-between text-xs tracking-widest text-pink-200">
            <span>CHEST UNLOCK PROGRESS</span>
            <span>{solved.length} / 3</span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-pink-300 to-yellow-200"
              animate={{ width: `${(solved.length / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="mt-4 flex justify-center gap-5">
            {clues.map((item, index) => (
              <div
                key={item.number}
                className={`flex h-11 w-11 items-center justify-center rounded-full border ${
                  solved.includes(index)
                    ? "border-yellow-200 bg-yellow-200 text-[#702448]"
                    : "border-pink-200/40 bg-white/10 text-pink-100"
                }`}
              >
                {solved.includes(index) ? (
                  <Unlock size={18} />
                ) : (
                  <Lock size={17} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Treasure chest */}
        <div className="relative mx-auto mt-12 flex h-64 max-w-sm items-end justify-center">
          <motion.div
            className="absolute bottom-0 z-10 h-36 w-64 rounded-b-[2rem] border-4 border-[#d9a34f] bg-gradient-to-br from-[#f4c46c] via-[#b66a39] to-[#6d302b] shadow-[0_20px_45px_rgba(0,0,0,0.4)]"
            animate={
              opened
                ? { boxShadow: "0 0 70px rgba(255,220,150,0.8)" }
                : {}
            }
          >
            <div className="absolute left-1/2 top-0 h-full w-5 -translate-x-1/2 bg-[#f7d58b]/80" />
            <div className="absolute left-0 top-7 h-3 w-full bg-[#f7d58b]/70" />
            <div className="absolute left-1/2 top-8 z-20 flex h-14 w-12 -translate-x-1/2 items-center justify-center rounded-lg border-2 border-yellow-200 bg-[#8b4a32] shadow-lg">
              {opened ? (
                <Unlock size={27} className="text-yellow-200" />
              ) : (
                <Lock size={27} className="text-yellow-200" />
              )}
            </div>
          </motion.div>

          {/* Chest lid */}
          <motion.div
            className="absolute bottom-[8.5rem] z-20 h-24 w-64 origin-bottom rounded-t-[5rem] border-4 border-[#e9bd69] bg-gradient-to-br from-[#f7d58b] via-[#c47a43] to-[#783a30] shadow-xl"
            animate={
              opened
                ? {
                    rotateX: -115,
                    y: -35,
                  }
                : {
                    rotateX: 0,
                    y: 0,
                  }
            }
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute bottom-0 left-1/2 h-full w-5 -translate-x-1/2 bg-[#f7d58b]/70" />
          </motion.div>

          {/* Treasure glow */}
          <AnimatePresence>
            {opened && (
              <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1.5 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-28 z-0 h-40 w-40 rounded-full bg-yellow-200/60 blur-3xl"
              />
            )}
          </AnimatePresence>

          {opened && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.4 }}
              animate={{ opacity: 1, y: -35, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute bottom-28 z-30 text-6xl"
            >
              💖
            </motion.div>
          )}
        </div>

        {/* Clue section */}
        <AnimatePresence mode="wait">
          {!allSolved && (
            <motion.div
              key={currentClue}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="mt-9 rounded-3xl border border-pink-200/30 bg-white/10 p-6 text-center backdrop-blur-md sm:p-8"
            >
              <p className="text-xs tracking-[0.3em] text-pink-200 uppercase">
                Secret {clue.number}
              </p>

              <h3 className="mt-3 font-serif text-2xl font-bold text-white">
                {clue.title}
              </h3>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-pink-100 sm:text-base">
                {clue.question}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {clue.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={showSuccess}
                    className="rounded-xl border border-pink-200/30 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:scale-105 hover:border-pink-200 hover:bg-pink-200/20 disabled:opacity-60"
                  >
                    {option}
                  </button>
                ))}
              </div>

              {wrongAnswer && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-5 text-sm text-pink-200"
                >
                  Not quite! Try again, sweetheart. 💗
                </motion.p>
              )}

              {showSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 font-serif text-lg italic text-yellow-200"
                >
                  {clue.success}
                </motion.p>
              )}
            </motion.div>
          )}

          {allSolved && !opened && (
            <motion.div
              key="unlocking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center"
            >
              <Sparkles className="mx-auto mb-3 text-yellow-200" size={30} />
              <h3 className="font-serif text-2xl text-pink-100">
                All three secrets unlocked!
              </h3>
              <p className="mt-2 text-sm text-pink-200">
                Your treasure is opening...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final love letter */}
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="mt-12 rounded-3xl border border-yellow-200/40 bg-gradient-to-br from-[#fff0d5] to-[#ffd7e4] p-7 text-center text-[#71344c] shadow-[0_0_50px_rgba(255,220,150,0.2)] sm:p-10"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <Heart
                  size={45}
                  fill="currentColor"
                  className="mx-auto text-pink-600"
                />
              </motion.div>

              <p className="mt-5 text-xs tracking-[0.3em] text-pink-600 uppercase">
                Your final treasure
              </p>

              <h3 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">
                The Greatest Treasure Is You
              </h3>

              <div className="mt-7 space-y-5 text-left leading-8">
                <p>Dear Aryan,</p>
                <p>Some treasures cannot be bought, wrapped, or locked away.</p>

                <p>For me, the greatest treasure is every moment, every laugh, and every little memory we have created together.</p>

                <p>Thank you for being part of my life and making these ten years so special.</p>

                <p className="font-serif text-xl italic text-pink-700">
                  If I could start our story all over again, I would still find my way to you. Every single time. ❤️
                </p>
              </div>

              <div className="mt-8 border-t border-pink-300/60 pt-7">
                <p className="font-serif text-2xl font-bold">
                  10 Years of Us
                </p>
                <p className="mt-2 text-sm italic text-pink-600">
                  My favourite story. My forever person.
                </p>
              </div>

              <button
                onClick={restart}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-pink-400 px-6 py-3 text-sm font-semibold text-pink-700 transition hover:bg-pink-100"
              >
                <RotateCcw size={16} />
                Relive the surprise
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
