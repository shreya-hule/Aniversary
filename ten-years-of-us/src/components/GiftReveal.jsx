
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const message = `Ten years ago, I never knew that one person
could become such a beautiful part of my life.

Through every laugh, every silly fight,
every little moment and every memory,
you have given me a thousand reasons to smile.

Thank you for being my favourite person,
my happiness and my sweetest blessing.

And if I could go back and choose again,
I would still choose you.

Here's to us, today and forever. ❤️`;

export default function GiftReveal({ onContinue }) {
  const [displayedText, setDisplayedText] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index++;

      setDisplayedText(message.slice(0, index));

      if (index >= message.length) {
        clearInterval(interval);
        setFinished(true);
      }
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 70, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9 }}
      className="relative mx-auto mt-10 w-full max-w-xl
        rounded-[30px] border border-pink-200
        bg-white/85 p-6 shadow-2xl backdrop-blur-lg
        sm:p-10"
    >
      {/* Decorative hearts */}
      <div className="absolute -right-3 -top-4
        rotate-12 text-4xl">
        💗
      </div>

      <div className="absolute -bottom-4 -left-3
        -rotate-12 text-4xl">
        💕
      </div>

      {/* Heading */}
      <div className="text-center">
        <Sparkles className="mx-auto mb-3
          text-pink-400" size={28} />

        <h2 className="font-serif text-3xl
          font-bold text-pink-700">
          A little something for you
        </h2>

        <p className="mt-2 text-sm
          text-pink-400">
          Made with all my love ❤️
        </p>
      </div>

      {/* Romantic GIF */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="my-7 flex justify-center"
      >
        <img
          src="/gifs/love.gif"
          alt="A little romantic surprise"
          className="h-44 w-44 rounded-2xl
            object-cover shadow-lg"
        />
      </motion.div>

      {/* Love letter */}
      <div className="rounded-2xl border border-pink-100
        bg-gradient-to-br from-rose-50 to-pink-100
        p-6 shadow-inner sm:p-8">

        <div className="mb-4 flex items-center gap-2">
          <Heart size={19} className="fill-pink-400
            text-pink-500" />

          <span className="font-serif text-lg
            italic text-pink-700">
            My dearest love,
          </span>
        </div>

        <p className="whitespace-pre-line
          font-serif text-base leading-8
          text-rose-900">
          {displayedText}
          {!finished && (
            <span className="ml-1 animate-pulse">
              |
            </span>
          )}
        </p>

        {finished && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-right font-serif
              text-xl italic text-pink-600"
          >
            Forever yours, ❤️
          </motion.p>
        )}
      </div>

      {/* Continue button */}
      {finished && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onContinue}
          className="mt-8 w-full rounded-full
            bg-gradient-to-r from-pink-500
            to-rose-400 px-6 py-4 font-semibold
            text-white shadow-lg transition
            hover:scale-[1.03] hover:shadow-xl"
        >
          Unlock Gift 2 💝 →
        </motion.button>
      )}
    </motion.section>
  );
}
