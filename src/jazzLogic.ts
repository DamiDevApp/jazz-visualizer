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

// --- NEW CHORD LOGIC ---

export type ChordQuality = "Major 7" | "Minor 7" | "Dominant 7";

export function getJazzChord(
  root: string,
  quality: ChordQuality,
  add9: boolean = false,
): JazzNote[] {
  // 1. Determine the suffix for Tonal.js
  let suffix = "";
  if (quality === "Major 7") suffix = "maj7";
  if (quality === "Minor 7") suffix = "m7";
  if (quality === "Dominant 7") suffix = "7";

  // 2. Default to octave 3 if no octave is provided, to ensure "single octave" view
  const rootWithOctave = /\d/.test(root) ? root : `${root}3`;

  // 3. Get intervals based on quality
  // We manually build intervals to control voicing tightness
  const intervals = ["1P"]; // Root

  if (quality === "Major 7") intervals.push("3M", "5P", "7M");
  if (quality === "Minor 7") intervals.push("3m", "5P", "7m");
  if (quality === "Dominant 7") intervals.push("3M", "5P", "7m");

  // 4. Handle Extensions
  if (add9) {
    intervals.push("9M");
  }

  // 5. Generate Notes
  return intervals.map((interval) => {
    const note = Note.transpose(rootWithOctave, interval);

    let role = "Chord Tone";
    if (interval === "1P") role = "Root";
    if (interval.includes("3") || interval.includes("7")) role = "Guide Tone";
    if (interval.includes("9")) role = "Extension (9th)";

    return {
      note: note, // This now contains the octave (e.g., "D4"), so Piano will match exactly
      interval,
      role,
    };
  });
}

// Keep generic getter for Interval mode
export function getIntervalNote(root: string, interval: string): JazzNote[] {
  const targetNote = Note.transpose(root, interval);
  return [
    { note: root, interval: "1P", role: "Root" },
    { note: targetNote, interval: interval, role: "Target Interval" },
  ];
}

// --- QUIZ GENERATORS ---
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
  // Simple chord quiz logic (can be expanded later)
  const root = getRandomRoot();
  const quality = "Dominant 7";
  const chordNotes = getJazzChord(root, quality);
  const target =
    chordNotes.find(
      (n) => n.interval.includes("3") || n.interval.includes("7"),
    ) || chordNotes[1];

  return {
    root,
    questionText: `Find the ${target.role} of ${root}7`,
    answer: Note.pitchClass(target.note),
    answerRole: target.role,
  };
}
