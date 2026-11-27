
import { useRef, useState } from "react";
import Home from "./pages/Home";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.error("Music could not play:", error);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="ten-years-of-us/audio.mp3"
        loop
        preload="auto"
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />

      <Home />

      <MusicPlayer
        playing={playing}
        onToggle={toggleMusic}
      />
    </>
  );
}

export default App;
