
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  Trophy,
  ArrowRight,
  Gamepad2,
  RotateCcw,
  ArrowLeft,
} from "lucide-react";

const heartMessages = [
  "Your smile makes even my ordinary days special. ❤️",
  "You are my favourite person to laugh with. 💗",
  "Every little moment with you becomes a memory. 💕",
  "If I had to choose again, I would still choose you. 💘",
  "You will always be my favourite Player One. 🕹️",
];

const symbols = ["❤️", "🌹", "💌", "🧸"];

const createCards = () =>
  [...symbols, ...symbols]
    .map((symbol, index) => ({
      id: index,
      symbol,
      matched: false,
    }))
    .sort(() => Math.random() - 0.5);

export default function LoveArcade({ onContinue }) {
  const [screen, setScreen] = useState("menu");
  const [completedGames, setCompletedGames] = useState([]);
  const [collected, setCollected] = useState([]);
  const [activeMessage, setActiveMessage] = useState("");

  const [cards, setCards] = useState(createCards);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const allGamesCompleted = completedGames.length === 2;

  const finishGame = (game) => {
    setCompletedGames((previous) =>
      previous.includes(game) ? previous : [...previous, game]
    );
  };

  // Game 1: Heart Hunt
  const collectHeart = (index) => {
    if (collected.includes(index)) return;

    setCollected((previous) => [...previous, index]);
    setActiveMessage(heartMessages[index]);

    if (collected.length === 4) {
      finishGame("heart");
    }
  };

  // Game 2: Memory Match
  const handleCardClick = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(cards[index].symbol + "-" + cards[index].id)
    ) {
      return;
    }

    const nextFlipped = [...flipped, index];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((previous) => previous + 1);
    }
  };

  useEffect(() => {
    if (flipped.length !== 2) return;

    const [first, second] = flipped;
    const firstCard = cards[first];
    const secondCard = cards[second];

    if (firstCard.symbol === secondCard.symbol) {
      const matchedCards = [
        firstCard.symbol + "-" + firstCard.id,
        secondCard.symbol + "-" + secondCard.id,
      ];

      const updatedMatched = [...matched, ...matchedCards];
      setMatched(updatedMatched);

      const timeout = setTimeout(() => {
        setFlipped([]);
      }, 650);

      if (updatedMatched.length === 8) {
        finishGame("memory");
      }

      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setFlipped([]);
    }, 900);

    return () => clearTimeout(timeout);
  }, [flipped, cards, matched]);

  const resetMemoryGame = () => {
    setCards(createCards());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  const isCardMatched = (card) =>
    matched.includes(card.symbol + "-" + card.id);

  const heartPositions = [
    { left: "13%", top: "25%" },
    { left: "72%", top: "22%" },
    { left: "44%", top: "48%" },
    { left: "19%", top: "72%" },
    { left: "77%", top: "72%" },
  ];

  return (
    <section className="relative min-h-[700px] w-full overflow-hidden rounded-[2rem] border-4 border-pink-300 bg-gradient-to-b from-[#32112f] via-[#581b50] to-[#28102f] px-4 py-8 text-white shadow-2xl sm:px-8">

      {/* Background stars */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute h-1.5 w-1.5 rounded-full bg-pink-200"
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${(index * 53) % 100}%`,
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 2 + (index % 3),
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">

        {/* Header */}
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-300/40 bg-pink-300/10 px-4 py-2 text-xs tracking-[0.25em] text-pink-200 uppercase">
            <Gamepad2 size={15} />
            A little game made with love
          </div>

          <h2 className="font-serif text-4xl font-bold text-pink-100 sm:text-6xl">
            Love Arcade
          </h2>

          <p className="mt-3 text-sm text-pink-200/80">
            Two games. Lots of love. One special surprise.
          </p>
        </div>

        {/* Game progress */}
        <div className="mx-auto mt-7 flex max-w-sm justify-center gap-3">
          <div className={`rounded-xl border px-4 py-3 text-center ${
            completedGames.includes("heart")
              ? "border-green-300/50 bg-green-400/15"
              : "border-pink-300/30 bg-white/10"
          }`}>
            <Heart className="mx-auto mb-1" size={20} />
            <p className="text-xs">Heart Hunt</p>
            <p className="mt-1 text-xs text-pink-200">
              {completedGames.includes("heart") ? "Completed ✓" : "Not played"}
            </p>
          </div>

          <div className={`rounded-xl border px-4 py-3 text-center ${
            completedGames.includes("memory")
              ? "border-green-300/50 bg-green-400/15"
              : "border-pink-300/30 bg-white/10"
          }`}>
            <Sparkles className="mx-auto mb-1" size={20} />
            <p className="text-xs">Memory Match</p>
            <p className="mt-1 text-xs text-pink-200">
              {completedGames.includes("memory") ? "Completed ✓" : "Not played"}
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* GAME MENU */}
          {screen === "menu" && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-9 grid gap-5 sm:grid-cols-2"
            >
              <button
                onClick={() => setScreen("heart")}
                className="rounded-3xl border border-pink-300/30 bg-white/10 p-7 text-center transition hover:scale-[1.03] hover:bg-white/15"
              >
                <div className="mb-4 text-6xl">💖</div>
                <h3 className="font-serif text-2xl font-bold">
                  Heart Hunt
                </h3>
                <p className="mt-3 text-sm text-pink-200/80">
                  Find five floating hearts and discover five reasons why I love you.
                </p>
                <p className="mt-5 text-xs font-bold tracking-widest text-pink-200 uppercase">
                  {completedGames.includes("heart") ? "Play again" : "Play game →"}
                </p>
              </button>

              <button
                onClick={() => setScreen("memory")}
                className="rounded-3xl border border-pink-300/30 bg-white/10 p-7 text-center transition hover:scale-[1.03] hover:bg-white/15"
              >
                <div className="mb-4 text-6xl">🃏</div>
                <h3 className="font-serif text-2xl font-bold">
                  Memory Match
                </h3>
                <p className="mt-3 text-sm text-pink-200/80">
                  Flip the cards, remember the symbols, and match all four pairs.
                </p>
                <p className="mt-5 text-xs font-bold tracking-widest text-pink-200 uppercase">
                  {completedGames.includes("memory") ? "Play again" : "Play game →"}
                </p>
              </button>
            </motion.div>
          )}

          {/* GAME 1: HEART HUNT */}
          {screen === "heart" && (
            <motion.div
              key="heart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8"
            >
              <button
                onClick={() => setScreen("menu")}
                className="mb-4 flex items-center gap-2 text-sm text-pink-200 hover:text-white"
              >
                <ArrowLeft size={16} /> Back to games
              </button>

              <div className="mb-5 text-center">
                <h3 className="font-serif text-3xl font-bold">
                  Heart Hunt 💗
                </h3>
                <p className="mt-2 text-sm text-pink-200">
                  Collect all five glowing hearts!
                </p>
                <p className="mt-3 font-bold">
                  {collected.length} / 5 hearts
                </p>
              </div>

              <div className="relative h-[380px] overflow-hidden rounded-3xl border border-pink-300/30 bg-[#35102f]/80">
                {heartMessages.map((_, index) => (
                  <AnimatePresence key={index}>
                    {!collected.includes(index) && (
                      <motion.button
                        onClick={() => collectHeart(index)}
                        style={heartPositions[index]}
                        initial={{ scale: 0 }}
                        animate={{
                          scale: [1, 1.2, 1],
                          y: [0, -12, 0],
                        }}
                        exit={{ scale: 2, opacity: 0 }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 text-pink-400 drop-shadow-[0_0_20px_rgba(244,114,182,0.9)]"
                      >
                        <Heart size={48} fill="currentColor" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                ))}

                {collected.length === 5 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#32112f]/90 text-center">
                    <Trophy size={50} className="mb-4 text-yellow-300" />
                    <h3 className="font-serif text-3xl">Level Completed!</h3>
                    <p className="mt-3 text-pink-200">
                      You collected every piece of my heart. ❤️
                    </p>
                    <button
                      onClick={() => setScreen("menu")}
                      className="mt-5 rounded-full bg-pink-200 px-6 py-2 font-semibold text-[#581b50]"
                    >
                      Back to games
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-5 min-h-24 rounded-2xl bg-white/10 p-5 text-center">
                <p className="text-xs tracking-widest text-pink-200 uppercase">
                  A message from my heart
                </p>
                <p className="mt-3 font-serif italic">
                  {activeMessage || "Tap a glowing heart to reveal a message."}
                </p>
              </div>
            </motion.div>
          )}

          {/* GAME 2: MEMORY MATCH */}
          {screen === "memory" && (
            <motion.div
              key="memory"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8"
            >
              <button
                onClick={() => setScreen("menu")}
                className="mb-4 flex items-center gap-2 text-sm text-pink-200 hover:text-white"
              >
                <ArrowLeft size={16} /> Back to games
              </button>

              <div className="mb-6 text-center">
                <h3 className="font-serif text-3xl font-bold">
                  Memory Match 🃏
                </h3>
                <p className="mt-2 text-sm text-pink-200">
                  Find all four matching pairs!
                </p>
                <p className="mt-3 text-sm">
                  Moves: <span className="font-bold">{moves}</span>
                  <span className="mx-3 text-pink-300">|</span>
                  Pairs: <span className="font-bold">{matched.length / 2} / 4</span>
                </p>
              </div>

              <div className="mx-auto grid max-w-md grid-cols-4 gap-3">
                {cards.map((card, index) => {
                  const isFlipped =
                    flipped.includes(index) || isCardMatched(card);

                  return (
                    <motion.button
                      key={card.id}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => handleCardClick(index)}
                      disabled={isFlipped || flipped.length === 2}
                      className={`flex aspect-square items-center justify-center rounded-2xl border text-3xl shadow-lg transition sm:text-4xl ${
                        isFlipped
                          ? "border-pink-200 bg-pink-100"
                          : "border-pink-300/40 bg-gradient-to-br from-pink-500 to-purple-700 hover:from-pink-400 hover:to-purple-600"
                      }`}
                    >
                      {isFlipped ? card.symbol : "?"}
                    </motion.button>
                  );
                })}
              </div>

              {matched.length === 8 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-7 rounded-2xl bg-white/10 p-6 text-center"
                >
                  <Trophy className="mx-auto mb-3 text-yellow-300" size={42} />
                  <h3 className="font-serif text-2xl">
                    Perfect Match! 💕
                  </h3>
                  <p className="mt-2 text-sm text-pink-200">
                    Just like these cards, we're a perfect match.
                  </p>
                  <button
                    onClick={() => setScreen("menu")}
                    className="mt-5 rounded-full bg-pink-200 px-6 py-2 font-semibold text-[#581b50]"
                  >
                    Back to games
                  </button>
                </motion.div>
              )}

              <div className="mt-5 text-center">
                <button
                  onClick={resetMemoryGame}
                  className="inline-flex items-center gap-2 text-sm text-pink-200 hover:text-white"
                >
                  <RotateCcw size={15} /> Restart game
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* FINAL ARCADE UNLOCK */}
        {allGamesCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-9 rounded-3xl border border-pink-200/40 bg-pink-300/10 p-7 text-center"
          >
            <Trophy className="mx-auto mb-4 text-yellow-300" size={50} />

            <p className="text-xs tracking-[0.3em] text-pink-200 uppercase">
              All games completed
            </p>

            <h3 className="mt-3 font-serif text-3xl font-bold">
              You're the winner of my heart!
            </h3>

            <p className="mt-4 text-pink-100">
              No matter how many games I play, you're always my favourite Player One. ❤️
            </p>

            <button
              onClick={onContinue}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-pink-200 px-7 py-3 font-semibold text-[#581b50] shadow-lg transition hover:scale-105 hover:bg-white"
            >
              Unlock the final surprise
              <ArrowRight size={18} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
