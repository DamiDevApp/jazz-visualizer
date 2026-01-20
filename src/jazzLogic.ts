import { Note, Chord } from "@tonaljs/tonal";
import { INTERVALS } from "./constants";

export interface JazzNote {
  note: string;
  interval: string;
  role: string;
}

export interface QuizQuestion {
  root: string;
  questionText: string;
  answer: string;
  answerRole: string;
}

const ROOTS = ["C", "F", "G", "Bb", "D", "Eb", "A", "Gb", "Ab"];

export function getRandomRoot() {
  return ROOTS[Math.floor(Math.random() * ROOTS.length)];
}

export function getDominantChord(rootNote: string): JazzNote[] {
  const chordData = Chord.get(`${rootNote} dom`);

  if (chordData.empty) {
    console.error("Invalid root note provided");
    return [];
  }

  const results: JazzNote[] = chordData.notes.map((noteName, index) => {
    const interval = chordData.intervals[index];

    let role = "Chord Tone";

    if (interval === "1P") role = "Root";
    if (interval === "3M") role = "Guide Tone (Determines Major)";
    if (interval === "7m") role = "Guide tone (Creates Tension)";

    return {
      note: noteName,
      interval: interval,
      role: role,
    };
  });

  return results;
}

export function getIntervalNote(root: string, interval: string): JazzNote[] {
  const targetNote = Note.transpose(root, interval);

  return [
    { note: root, interval: "1P", role: "Root" },
    { note: targetNote, interval: interval, role: "Target Interval" },
  ];
}

export function generateIntervalQuestion(): QuizQuestion {
  const root = getRandomRoot();
  const randomInt = INTERVALS[Math.floor(Math.random() * INTERVALS.length)];
  const answerNote = Note.transpose(root, randomInt.value);

  return {
    root,
    questionText: `Find the ${randomInt.label} of ${root}`,
    answer: Note.pitchClass(answerNote),
    answerRole: randomInt.label,
  };
}

export function generateChordQuestion(): QuizQuestion {
  const root = getRandomRoot();

  const chordNotes = getDominantChord(root);

  const target =
    chordNotes[Math.floor(1 + Math.random() * (chordNotes.length - 1))];

  return {
    root,
    questionText: `Find the ${target.role} of ${root}`,
    answer: Note.pitchClass(target.note),
    answerRole: target.role,
  };
}
