import React from "react";
import { DIFFICULTIES } from "../../constants/difficulties.constants";
import { CHORD_COLORS, UI_COLORS } from "../../constants/theme.constants";
import styles from "./QuizControls.module.css";

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
    <div className={styles.container}>
      <h3>Interval Training</h3>

      {/* Settings Area (Only visible before start) */}
      {!target && (
        <div className={styles.settingsAreaContainer}>
          {/* Difficulty */}
          <div className={styles.difficultyContainer}>
            <p className={styles.difficultyText}>Timer Difficulty:</p>
            <div className={styles.difficultiesContainer}>
              {DIFFICULTIES.map((diff) => (
                <button
                  key={diff.label}
                  onClick={() => setTimerSetting(diff.value)}
                  className={`${styles.difficultyButton} ${timerSetting === diff.value ? styles.difficultyButtonActive : ""}`}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>

          {/* Root Toggle */}
          <div>
            <label className={styles.rootLabel}>
              <input
                type="checkbox"
                checked={showRoot}
                onChange={(e) => setShowRoot(e.target.checked)}
                className={styles.checkboxRoot}
              />
              <span className={styles.spanRoot}>
                Show Root Note while guessing?
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Game Status */}
      <div className={styles.statusContainer}>
        <span>
          Score: {score.correct} / {score.total}
        </span>
        {target && timerSetting > 0 && (
          <span
            className={`${styles.spanStatus} ${timeLeft <= 3 ? styles.spanStatusActive : ""}`}
          >
            Time: {timeLeft}s
          </span>
        )}
      </div>

      <div className={styles.messageText}>{message}</div>

      {!target && (
        <button onClick={onStart} className={styles.startButton}>
          Start Quiz
        </button>
      )}

      {/* Legend (Always visible) */}
      <div className={styles.legendContainer}>
        <p className={styles.legendTitle}>Color Legend:</p>
        <div className={styles.legendList}>
          <div className={styles.legendItem}>
            <div className={`${styles.swatch} ${styles.swatchRoot}`}></div>
            <span>Root Note</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.swatch} ${styles.swatchGuide}`}></div>
            <span>Target (Guide)</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.swatch} ${styles.swatchFifth}`}></div>
            <span>Other Chord Tones</span>
          </div>
        </div>
      </div>
    </div>
  );
};
