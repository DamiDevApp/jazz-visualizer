import React, { useState } from "react";
import { Piano } from "./Piano";
import { QuizControls } from "./QuizControls";
import { useQuizGame } from "../hooks/useQuizGame";
import {
  getJazzChord,
  generateChordQuestion,
  ChordQuality,
} from "../jazzLogic";

const CHORD_TYPES: ChordQuality[] = ["Major 7", "Minor 7", "Dominant 7"];

export const ChordSection = () => {
  const [subTab, setSubTab] = useState<"learn" | "quiz">("learn");

  // VISUALIZER STATE
  const [root, setRoot] = useState("C");
  const [quality, setQuality] = useState<ChordQuality>("Dominant 7");
  const [showNinth, setShowNinth] = useState(false);

  // QUIZ STATE
  const quiz = useQuizGame(generateChordQuestion);

  // Determine active notes
  const activeNotes =
    subTab === "learn"
      ? getJazzChord(root, quality, showNinth)
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
      {/* TABS */}
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
        <div style={{ marginTop: 20, textAlign: "center", width: "100%" }}>
          <div style={{ marginBottom: 15 }}>
            <h3>
              {root} {quality} {showNinth && "(add 9)"}
            </h3>
            <p style={{ color: "#666" }}>Click keys to change root.</p>
          </div>

          {/* CONTROLS */}
          <div
            style={{
              display: "flex",
              gap: 20,
              justifyContent: "center",
              alignItems: "center",
              background: "#f9fafb",
              padding: 15,
              borderRadius: 8,
            }}
          >
            {/* Quality Selector */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <label
                style={{
                  fontSize: "0.85em",
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                Chord Quality
              </label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value as ChordQuality)}
                style={{
                  padding: 8,
                  borderRadius: 4,
                  border: "1px solid #ccc",
                }}
              >
                {CHORD_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Extensions Toggle */}
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 15 }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={showNinth}
                  onChange={(e) => setShowNinth(e.target.checked)}
                  style={{ width: 16, height: 16 }}
                />
                <span>Add 9th (Extension)</span>
              </label>
            </div>
          </div>

          {/* COLOR LEGEND */}
          <div
            style={{
              marginTop: 20,
              display: "flex",
              gap: 15,
              justifyContent: "center",
              fontSize: "0.8em",
              color: "#555",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span
                style={{ width: 10, height: 10, background: "#60a5fa" }}
              ></span>{" "}
              Root
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span
                style={{ width: 10, height: 10, background: "#34d399" }}
              ></span>{" "}
              Guide Tones (3/7)
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span
                style={{ width: 10, height: 10, background: "#fbbf24" }}
              ></span>{" "}
              5th
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span
                style={{ width: 10, height: 10, background: "#f472b6" }}
              ></span>{" "}
              9th
            </span>
          </div>
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
