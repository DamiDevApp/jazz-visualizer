import { useState, useEffect } from "react";
import { getDominantChord, getIntervalNote } from "./jazzLogic";
import { Piano } from "./components/Piano";
import { IntervalControls } from "./components/IntervalControls";
import { QuizControls } from "./components/QuizControls";
import { useQuizGame } from "./hooks/useQuizGame";

type AppMode = "chords" | "intervals" | "quiz";

function App() {
  const [mode, setMode] = useState<AppMode>("intervals");
  const [root, setRoot] = useState("C");
  const [selectedInterval, setSelectedInterval] = useState("3M");
  const quiz = useQuizGame();

  const getActiveNotes = () => {
    if (mode === "chords") return getDominantChord(root);
    if (mode === "intervals") return getIntervalNote(root, selectedInterval);
    if (mode === "quiz") return quiz.activeNotes;
    return [];
  };

  const handleKeyClick = (note: string) => {
    if (mode === "quiz") {
      quiz.handleGuess(note);
    } else {
      setRoot(note);
    }
  };

  useEffect(() => {
    if (mode !== "quiz") quiz.resetQuiz();
  }, [mode]);

  return (
    <>
      {/* Global reset to ensure the app can take full width/height */}
      <style>{`
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>

      <div
        style={{
          // LAYOUT FIX:
          display: "grid", // Uses CSS Grid
          placeItems: "center", // Centers child vertically AND horizontally
          minHeight: "100vh", // Minimum height of the viewport
          width: "100vw", // Force width to match the viewport
          backgroundColor: "#fff", // Optional: ensures background is clean
          fontFamily: "sans-serif",
          color: "#333",
          boxSizing: "border-box",
        }}
      >
        {/* Inner Content Wrapper */}
        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Centers items inside this column
            textAlign: "center", // Ensures text inside blocks is centered
          }}
        >
          <h1 style={{ marginBottom: 10 }}>Jazz Visualizer</h1>

          {/* Navigation Tabs */}
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            {(["intervals", "quiz", "chords"] as AppMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  padding: "10px 20px",
                  fontWeight: mode === m ? "bold" : "normal",
                  background: mode === m ? "#3b82f6" : "#e5e7eb",
                  color: mode === m ? "white" : "black",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>

          <Piano
            startNote="C3"
            endNote="C5"
            activeNotes={getActiveNotes()}
            onKeyClick={handleKeyClick}
          />

          {mode === "intervals" && (
            <IntervalControls
              root={root}
              selectedInterval={selectedInterval}
              onIntervalSelect={setSelectedInterval}
            />
          )}

          {mode === "quiz" && (
            <QuizControls
              target={quiz.target}
              message={quiz.message}
              score={quiz.score}
              timeLeft={quiz.timeLeft}
              timerSetting={quiz.timerSetting}
              setTimerSetting={quiz.setTimerSetting}
              showRoot={quiz.showRoot}
              setShowRoot={quiz.setShowRoot}
              onStart={quiz.startQuestion}
            />
          )}

          {mode === "chords" && (
            <div style={{ marginTop: 20 }}>
              <h3>{root} Dominant 7</h3>
              <p>Click any key to change the root.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
