
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import FloatingHearts from "../components/FloatingHearts";
import CupidIntro from "../components/CupidIntro";
import GiftBox from "../components/GiftBox";
import GiftReveal from "../components/GiftReveal";
import StageTwoReveal from "../components/StageTwoReveal";
import StageThreeReveal from "../components/StageThreeReveal";
import LoveArcade from "../components/LoveArcade";
import StageFiveReveal from "../components/StageFiveReveal";

export default function Home() {
  const [currentStage, setCurrentStage] = useState(1);
  const [opened, setOpened] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  const handleGiftOpen = () => {
    setOpened(true);
  };

  const handleContinue = () => {
    if (currentStage < 5) {
      setOpened(false);
      setCurrentStage((previous) => previous + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const getSubtitle = () => {
    switch (currentStage) {
      case 1:
        return "Every love story is beautiful...";
      case 2:
        return "A thousand memories, one beautiful story...";
      case 3:
        return "Every page holds a piece of my heart...";
      case 4:
        return "Ready for a little game of love?";
      case 5:
        return "The greatest treasure is you...";
      default:
        return "Our beautiful love story ❤️";
    }
  };

  const getDescription = () => {
    switch (currentStage) {
      case 1:
        return "But ours will always be my favourite. ❤️";
      case 2:
        return "My favourite memories are with you. ❤️";
      case 3:
        return "Our story is my favourite book. ❤️";
      case 4:
        return "Complete both games to unlock your final surprise. 💗";
      case 5:
        return "Three secrets. One treasure. A lifetime of love. ❤️";
      default:
        return "Made with endless love. ❤️";
    }
  };

  return (
    <main
      className="relative flex min-h-screen flex-col
        items-center justify-center overflow-hidden
        bg-gradient-to-br from-pink-100 via-rose-50
        to-pink-200 px-5 py-20"
    >
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {!introComplete ? (
          <motion.div
            key="cupid-intro"
            className="relative z-10 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <CupidIntro
              onContinue={() => setIntroComplete(true)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="anniversary-stages"
            className="relative z-10 flex w-full
              flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Anniversary heading */}
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="mb-3 text-sm font-semibold
                uppercase tracking-[0.4em] text-pink-500">
                A special day for us
              </p>

              <h1 className="font-serif text-5xl font-bold
                text-pink-700 sm:text-7xl">
                10 Years of Us
              </h1>

              <p className="mt-4 font-serif text-xl
                italic text-pink-500">
                {getSubtitle()}
              </p>

              <p className="mt-2 text-base text-pink-700/70">
                {getDescription()}
              </p>
            </motion.div>

            {/* Stage progress */}
            <div className="mt-6 flex items-center gap-2">
              <span className="text-xs font-bold
                tracking-widest text-pink-600">
                GIFT {String(currentStage).padStart(2, "0")} / 05
              </span>

              <div className="h-2 w-28 overflow-hidden
                rounded-full bg-pink-200">
                <motion.div
                  className="h-full rounded-full bg-pink-500"
                  initial={false}
                  animate={{
                    width: `${currentStage * 20}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Gift boxes for stages 1 and 2 */}
            {currentStage <= 2 && (
              <motion.div
                key={`box-${currentStage}`}
                className="my-12 sm:my-16"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
              >
                <GiftBox
                  opened={opened}
                  onOpen={handleGiftOpen}
                />
              </motion.div>
            )}

            {/* Reveal content */}
            <AnimatePresence mode="wait">
              {currentStage <= 2 && !opened ? (
                <motion.p
                  key={`hint-${currentStage}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-pink-600"
                >
                  {currentStage === 1
                    ? "I have something special for you... 💗"
                    : "Another little surprise is waiting... 💝"}
                </motion.p>
              ) : currentStage === 1 && opened ? (
                <GiftReveal
                  key="gift-reveal"
                  onContinue={handleContinue}
                />
              ) : currentStage === 2 && opened ? (
                <StageTwoReveal
                  key="stage-two"
                  onContinue={handleContinue}
                />
              ) : currentStage === 3 ? (
                <StageThreeReveal
                  key="stage-three"
                  onContinue={handleContinue}
                />
              ) : currentStage === 4 ? (
                <LoveArcade
                  key="love-arcade"
                  onContinue={handleContinue}
                />
              ) : currentStage === 5 ? (
                <StageFiveReveal key="stage-five" />
              ) : null}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <p className="absolute bottom-5 right-5 z-10
        text-xs text-pink-500/70">
        Made with endless love ❤️
      </p>
    </main>
  );
}
