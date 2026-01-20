import { useState, useEffect } from "react";
import { Note } from "@tonaljs/tonal";
import { JazzNote, QuizQuestion } from "../jazzLogic";

// The hook now expects a function that returns a QuizQuestion
export function useQuizGame(generator: () => QuizQuestion) {
  const [target, setTarget] = useState<QuizQuestion | null>(null);
  const [message, setMessage] = useState("Press Start to begin!");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [activeNotes, setActiveNotes] = useState<JazzNote[]>([]);

  // Settings
  const [timerSetting, setTimerSetting] = useState(10);
  const [showRoot, setShowRoot] = useState(true);

  // Game State
  const [timeLeft, setTimeLeft] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const startQuestion = () => {
    // USE THE GENERATOR PASSED IN
    const newQuestion = generator();

    setTarget(newQuestion);
    setMessage(newQuestion.questionText);

    if (showRoot) {
      setActiveNotes([
        { note: newQuestion.root, interval: "1P", role: "Root" },
      ]);
    } else {
      setActiveNotes([]);
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

    // FEEDBACK VISUALS
    setActiveNotes([
      { note: target.root, interval: "1P", role: "Root" },
      { note: target.answer, interval: "Target", role: target.answerRole },
    ]);

    setScore((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1,
    }));

    if (isTimeout) {
      setMessage(`⏰ Time's up! Answer: ${target.answer}`);
    } else if (isCorrect) {
      setMessage(`✅ Correct! ${target.answer} is the ${target.answerRole}`);
    } else {
      setMessage(
        `❌ Wrong. You played ${noteClicked}. Answer: ${target.answer}`,
      );
    }

    setTimeout(startQuestion, 2000);
  };

  return {
    target,
    message,
    score,
    activeNotes,
    timeLeft,
    timerSetting,
    setTimerSetting,
    showRoot,
    setShowRoot,
    startQuestion,
    handleGuess,
    resetQuiz: () => {
      setTarget(null);
      setActiveNotes([]);
      setMessage("Press Start to begin!");
    },
  };
}
