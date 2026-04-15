import { useState } from "react";
import { Piano } from "../Instruments/Piano";
import { IntervalControls } from "./IntervalControls";
import { QuizControls } from "../Quiz/QuizControls";
import { useQuizGame } from "../../hooks/useQuizGame";
import { getIntervalNote, generateIntervalQuestion } from "../../jazzLogic";
import styles from "./IntervalSection.module.css";
import { TabBar } from "../UI/TabBar";
import { SECTION_TABS } from "./Section.constants";

export const IntervalSection = () => {
  const [subTab, setSubTab] = useState<string>("learn");

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
