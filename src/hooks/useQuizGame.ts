import { useState, useEffect } from "react";
import { Note } from "@tonaljs/tonal";
import { INTERVALS } from "../constants";
import { JazzNote } from "../jazzLogic";

export function useQuizGame() {
  const [target, setTarget] = useState<{
    root: string;
    interval: string;
    answer: string;
  } | null>(null);
  const [message, setMessage] = useState("Configure your timer and start!");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [activeNotes, setActiveNotes] = useState<JazzNote[]>([]);

  // Settings
  const [timerSetting, setTimerSetting] = useState(10);
  const [showRoot, setShowRoot] = useState(true); // New Toggle State

  // Game State
  const [timeLeft, setTimeLeft] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const startQuestion = () => {
    const randomRoot = ["C", "F", "G", "Bb", "D", "Eb", "A", "Gb", "Ab"][
      Math.floor(Math.random() * 9)
    ];
    const randomInt = INTERVALS[Math.floor(Math.random() * INTERVALS.length)];
    const answerNote = Note.transpose(randomRoot, randomInt.value);

    setTarget({
      root: randomRoot,
      interval: randomInt.label,
      answer: Note.pitchClass(answerNote),
    });

    setMessage(`Find the ${randomInt.label} of ${randomRoot}`);

    // LOGIC CHANGE: Only show root if the setting is true
    if (showRoot) {
      setActiveNotes([{ note: randomRoot, interval: "1P", role: "Root" }]);
    } else {
      setActiveNotes([]); // Empty piano for extra difficulty
    }

    setTimeLeft(timerSetting);
    setIsProcessing(false);
  };

  useEffect(() => {
    if (!target || isProcessing || timerSetting === 0 || timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [target, isProcessing, timerSetting, timeLeft]);

  useEffect(() => {
    if (timerSetting > 0 && timeLeft === 0 && target && !isProcessing) {
      handleGuess(null);
    }
  }, [timeLeft, target, isProcessing, timerSetting]);

  const handleGuess = (noteClicked: string | null) => {
    if (!target || isProcessing) return;

    setIsProcessing(true);
    const isTimeout = noteClicked === null;
    const isCorrect =
      !isTimeout && Note.chroma(noteClicked) === Note.chroma(target.answer);

    // FEEDBACK PHASE: Always show Root + Target (Guide Tone)
    setActiveNotes([
      { note: target.root, interval: "1P", role: "Root" },
      { note: target.answer, interval: "Target", role: "Guide Tone" },
    ]);

    setScore((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1,
    }));

    if (isTimeout) {
      setMessage(`⏰ Time's up! Answer: ${target.answer}`);
    } else if (isCorrect) {
      setMessage(`✅ Correct! ${target.answer} is the ${target.interval}`);
    } else {
      setMessage(
        `❌ Wrong. You played ${noteClicked}. Answer: ${target.answer}`,
      );
    }

    setTimeout(startQuestion, 2000); // Increased delay slightly so you can study the interval
  };

  return {
    target,
    message,
    score,
    activeNotes,
    timeLeft,
    // Settings exports
    timerSetting,
    setTimerSetting,
    showRoot,
    setShowRoot,
    // Actions
    startQuestion,
    handleGuess,
    resetQuiz: () => {
      setTarget(null);
      setActiveNotes([]);
      setMessage("Configure settings and start!");
    },
  };
}
