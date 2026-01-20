import React, { useState } from "react";
import { Piano } from "./Piano";
import { IntervalControls } from "./IntervalControls";
import { QuizControls } from "./QuizControls";
import { useQuizGame } from "../hooks/useQuizGame";
import { getIntervalNote, generateIntervalQuestion } from "../jazzLogic";

export const IntervalSection = () => {
  const [subTab, setSubTab] = useState<"learn" | "quiz">("learn");

  // 1. VISUALIZER STATE
  const [root, setRoot] = useState("C");
  const [selectedInterval, setSelectedInterval] = useState("3M");

  // 2. QUIZ STATE (Using generic hook with Interval Generator)
  const quiz = useQuizGame(generateIntervalQuestion);

  // DECIDE WHAT TO SHOW ON PIANO
  const activeNotes =
    subTab === "learn"
      ? getIntervalNote(root, selectedInterval)
      : quiz.activeNotes;

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
      {/* SUB-TABS (Learn vs Practice) */}
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
          📖 Learn Intervals
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
        <IntervalControls
          root={root}
          selectedInterval={selectedInterval}
          onIntervalSelect={setSelectedInterval}
        />
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
