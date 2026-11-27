import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function StageTwoReveal({ onContinue }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative mx-auto mt-8 w-full max-w-xl
        rounded-[30px] border border-pink-200
        bg-white/85 p-6 shadow-2xl backdrop-blur-lg
        sm:p-10"
    >
      <div className="absolute -right-3 -top-4 text-4xl">
        💕
      </div>

      <div className="text-center">
        <Sparkles className="mx-auto mb-3 text-pink-400" size={28} />

        <p className="text-sm font-semibold uppercase
          tracking-[0.3em] text-pink-400">
          Chapter 02
        </p>

        <h2 className="mt-2 font-serif text-3xl
          font-bold text-pink-700">
          Our Beautiful Memories
        </h2>

        <p className="mt-3 text-sm text-pink-500">
          Every moment with you is a little treasure.
        </p>
      </div>

      {/* Couple GIF */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="my-7 flex justify-center"
      >
        <img
          src="/gifs/couple-hug.gif"
          alt="A couple sharing a warm hug"
          className="h-52 w-52 rounded-3xl
            border-4 border-white object-cover shadow-xl"
        />
      </motion.div>

      {/* Memory letter */}
      <div className="rounded-2xl border border-pink-100
        bg-gradient-to-br from-rose-50 to-pink-100
        p-6 shadow-inner sm:p-8"
      >
        <div className="mb-4 flex items-center gap-2">
          <Heart size={20} className="fill-pink-400 text-pink-500" />
          <h3 className="font-serif text-xl italic text-pink-700">
            To my favourite memory,
          </h3>
        </div>

        <p className="font-serif text-base leading-8 text-rose-900">
          A beautiful journey that started 10 years ago with a simple Passion Pro… ❤️

          {"\n\n"}

          From those little rides and innocent memories to the sporty R15, every ride brought us closer and gave us stories to remember. 🥹

          {"\n\n"}

          Then came the dream upgrade — GS 310! 🔥 Bigger dreams, longer rides and countless adventures together.
          And guess what? Our story isn’t over yet… the next chapter is waiting with an upcoming Sports Bike! 😉🏁

          {"\n\n"}

          10 years, countless memories, different bikes, but the same two hearts and the same love. ❤️
          From Passion Pro to R15, R15 to GS 310, and GS 310 to our next dream machine…
          Bikes upgraded, dreams upgraded, but my favourite riding partner remains the same! 🧿

          {"\n\n"}

          Here’s to 10 years down the road and a lifetime of rides ahead. ❤️♾️
          Our love story has no destination… just endless roads and one more gear to shift! 🏍️😘
        </p>

        <p className="mt-6 text-right font-serif text-xl italic text-pink-600">
          With all my love, ❤️
        </p>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={onContinue}
        className="mt-8 w-full rounded-full
          bg-gradient-to-r from-pink-500 to-rose-400
          px-6 py-4 font-semibold text-white
          shadow-lg transition hover:scale-[1.03]
          hover:shadow-xl"
      >
        Continue to Gift 3 💝 →
      </motion.button>
    </motion.section>
  );
}
