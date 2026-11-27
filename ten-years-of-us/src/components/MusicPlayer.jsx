
import { motion } from "framer-motion";
import { Disc3, Pause, Play } from "lucide-react";

export default function MusicPlayer({ playing, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-5 left-5 z-50 flex
        items-center gap-3 rounded-full
        border border-pink-200 bg-white/90
        px-3 py-2 shadow-lg backdrop-blur-md"
    >
      <motion.div
        animate={{ rotate: playing ? 360 : 0 }}
        transition={{
          duration: 3,
          repeat: playing ? Infinity : 0,
          ease: "linear",
        }}
      >
        <Disc3 size={38} className="text-pink-500" />
      </motion.div>

      <span className="text-xs font-semibold text-pink-700">
        {playing ? "Playing our song" : "Play our song"}
      </span>

      {playing ? (
        <Pause size={17} className="text-pink-600" />
      ) : (
        <Play size={17} className="text-pink-600" />
      )}
    </button>
  );
}
