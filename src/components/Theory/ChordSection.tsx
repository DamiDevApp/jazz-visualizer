import { useState } from "react";
import { Piano } from "../Instruments/Piano";
import { QuizControls } from "../Quiz/QuizControls";
import { useQuizGame } from "../../hooks/useQuizGame";
import {
  getJazzChord,
  generateChordQuestion,
  ChordQuality,
} from "../../jazzLogic";
import styles from "./ChordSection.module.css";
import { TabBar } from "../UI/TabBar";
import { SECTION_TABS } from "./Section.constants";

const CHORD_TYPES: ChordQuality[] = ["Major 7", "Minor 7", "Dominant 7"];

/**
 * Returns a brief explanation of the chord components based on selection.
 */
const getChordDescription = (
  root: string,
  quality: ChordQuality,
  showNinth: boolean,
) => {
  const descriptions: Record<ChordQuality, string> = {
    "Major 7": "A bright, stable sound. Uses a Major 3rd and a Major 7th.",
    "Minor 7": "A moody, soft sound. Uses a Minor 3rd and a Minor 7th.",
    "Dominant 7":
      "A 'bluesy' sound that wants to resolve. Uses a Major 3rd and a Minor 7th.",
  };

  return (
    <div className={styles.chordDescriptionContainer}>
      <p>
        <strong>Root ({root}):</strong> The foundation of the chord.
      </p>
      <p>
        <strong>Guide Tones (3 & 7):</strong> These define the {quality}{" "}
        quality.
      </p>
      <p>
        <strong>5th:</strong> Provides stability and thickness.
      </p>
      {showNinth && (
        <p className={styles.ninthColor}>
          <strong>9th (Extension):</strong> Adds color and "jazz"
          sophistication.
        </p>
      )}
    </div>
  );
};

export const ChordSection = () => {
  const [subTab, setSubTab] = useState<string>("learn");

  // VISUALIZER STATE
  const [root, setRoot] = useState("C");
  const [quality, setQuality] = useState<ChordQuality>("Dominant 7");
  const [showNinth, setShowNinth] = useState(false);

  // QUIZ STATE
  const quiz = useQuizGame(generateChordQuestion);

  const activeNotes =
    subTab === "learn"
      ? getJazzChord(root, quality, showNinth)
      : quiz.activeNotes;

  const handleKeyClick = (note: string) => {
    if (subTab === "quiz") quiz.handleGuess(note);
    else setRoot(note);
  };

  return (
    <div className={styles.container}>
      <TabBar
        modes={SECTION_TABS}
        activeTab={subTab}
        onTabChange={(key) => setSubTab(key)}
      />
      <Piano
        startNote="C3"
        endNote="C5"
        activeNotes={activeNotes}
        onKeyClick={handleKeyClick}
      />

      {subTab === "learn" ? (
        <div className={styles.tabLearnContainer}>
          <div style={{ marginBottom: 15 }}>
            <h3>
              {root} {quality} {showNinth && "(add 9)"}
            </h3>
            {/* NEW DESCRIPTION BOX */}
            <div className={styles.descriptionBoxContainer}>
              {getChordDescription(root, quality, showNinth)}
            </div>
          </div>

          {/* CONTROLS (Existing) */}
          <div className={styles.controlsContainer}>
            <div className={styles.controlsDisplay}>
              <label className={styles.chordLabel}>Chord Quality</label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value as ChordQuality)}
                className={styles.selectFormat}
              >
                {CHORD_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.optionsContainer}>
              <label className={styles.optionsLabel}>
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

          {/* COLOR LEGEND (Updated Pink Reference) */}
          <div className={styles.extensionContainer}>
            <span className={styles.spanSpacing}>
              <span className={styles.spanRootColor}></span> Root
            </span>
            <span className={styles.spanContainer}>
              <span className={styles.spanGuideColor}></span> Guide Tones (3/7)
            </span>
            <span className={styles.spanContainer}>
              <span className={styles.spanFifthColor}></span> 5th
            </span>
            <span className={styles.spanContainer}>
              <span className={styles.spanNinthColor}></span> 9th
            </span>
          </div>
        </div>
      ) : (
        <QuizControls {...quiz} onStart={quiz.startQuestion} />
      )}
    </div>
  );
};
