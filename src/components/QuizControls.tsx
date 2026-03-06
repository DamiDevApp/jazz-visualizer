import React from "react";
import { DIFFICULTIES } from "../constants/difficulties.constants";
import { CHORD_COLORS, UI_COLORS } from "../constants/theme.constants";

interface Props {
  target: any;
  message: string;
  score: { correct: number; total: number };
  timeLeft: number;

  // Settings
  timerSetting: number;
  setTimerSetting: (val: number) => void;
  showRoot: boolean;
  setShowRoot: (val: boolean) => void;

  onStart: () => void;
}

export const QuizControls: React.FC<Props> = ({
  target,
  message,
  score,
  timeLeft,
  timerSetting,
  setTimerSetting,
  showRoot,
  setShowRoot,
  onStart,
}) => {
  return (
    <div
      style={{
        marginTop: 20,
        textAlign: "center",
        background: UI_COLORS.background,
        padding: 20,
        borderRadius: 12,
        width: "100%",
      }}
    >
      <h3>Interval Training</h3>

      {/* Settings Area (Only visible before start) */}
      {!target && (
        <div
          style={{
            marginBottom: 20,
            padding: 15,
            background: UI_COLORS.background,
            borderRadius: 8,
          }}
        >
          {/* Difficulty */}
          <div style={{ marginBottom: 15 }}>
            <p style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>
              Timer Difficulty:
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              {DIFFICULTIES.map((diff) => (
                <button
                  key={diff.label}
                  onClick={() => setTimerSetting(diff.value)}
                  style={{
                    padding: "6px 12px",
                    background:
                      timerSetting === diff.value
                        ? UI_COLORS.primary
                        : UI_COLORS.backgroundDarker,
                    color: timerSetting === diff.value ? "white" : "black",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>

          {/* Root Toggle */}
          <div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={showRoot}
                onChange={(e) => setShowRoot(e.target.checked)}
                style={{ width: 18, height: 18 }}
              />
              <span style={{ fontSize: "1.1em" }}>
                Show Root Note while guessing?
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Game Status */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
          fontWeight: "bold",
          padding: "0 10px",
        }}
      >
        <span>
          Score: {score.correct} / {score.total}
        </span>
        {target && timerSetting > 0 && (
          <span style={{ color: timeLeft <= 3 ? UI_COLORS.danger : "black" }}>
            Time: {timeLeft}s
          </span>
        )}
      </div>

      <div style={{ fontSize: "1.5em", marginBottom: 15, minHeight: "1.5em" }}>
        {message}
      </div>

      {!target && (
        <button
          onClick={onStart}
          style={{
            fontSize: "1.2em",
            padding: "10px 30px",
            background: UI_COLORS.primary,
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Start Quiz
        </button>
      )}

      {/* Legend (Always visible) */}
      <div
        style={{
          marginTop: 25,
          borderTop: `1px solid ${UI_COLORS.backgroundDarker}`,
          paddingTop: 10,
        }}
      >
        <p
          style={{
            fontSize: "0.9em",
            color: UI_COLORS.textMuted,
            marginBottom: 5,
          }}
        >
          Color Legend:
        </p>
        <div
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
            fontSize: "0.9em",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div
              style={{
                width: 15,
                height: 15,
                background: CHORD_COLORS.root,
                border: `1px solid ${UI_COLORS.backgroundDarker}`,
              }}
            ></div>
            <span>Root Note</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div
              style={{
                width: 15,
                height: 15,
                background: CHORD_COLORS.guideTone,
                border: `1px solid ${UI_COLORS.border}`,
              }}
            ></div>
            <span>Target (Guide)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div
              style={{
                width: 15,
                height: 15,
                background: CHORD_COLORS.fifth,
                border: `1px solid ${UI_COLORS.border}`,
              }}
            ></div>
            <span>Other Chord Tones</span>
          </div>
        </div>
      </div>
    </div>
  );
};
