import React, { useState } from "react";
import { Piano } from "./Piano";
import { QuizControls } from "./QuizControls";
import { useQuizGame } from "../hooks/useQuizGame";
import { getDominantChord, generateChordQuestion } from "../jazzLogic";

export const ChordSection = () => {
  const [subTab, setSubTab] = useState<"learn" | "quiz">("learn");
  const [root, setRoot] = useState("C");

  // Use generic hook with CHORD Generator
  const quiz = useQuizGame(generateChordQuestion);

  const activeNotes =
    subTab === "learn" ? getDominantChord(root) : quiz.activeNotes;

  const handleKeyClick = (note: string) => {
    if (subTab === "quiz") quiz.handleGuess(note);
    else setRoot(note);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginBottom: 20,
          borderBottom: "1px solid #ddd",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => setSubTab("learn")}
          style={{
            padding: "10px 20px",
            borderBottom: subTab === "learn" ? "3px solid #3b82f6" : "none",
            background: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          📖 Learn Chords
        </button>
        <button
          onClick={() => setSubTab("quiz")}
          style={{
            padding: "10px 20px",
            borderBottom: subTab === "quiz" ? "3px solid #10b981" : "none",
            background: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🎮 Practice Quiz
        </button>
      </div>

      <Piano
        startNote="C3"
        endNote="C5"
        activeNotes={activeNotes}
        onKeyClick={handleKeyClick}
      />

      {subTab === "learn" ? (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <h3>{root} Dominant 7 Visualizer</h3>
          <p>Click keys to change root.</p>
        </div>
      ) : (
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
    </div>
  );
};
