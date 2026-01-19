import { Note, Chord } from "@tonaljs/tonal";

export interface JazzNote {
  note: string;
  interval: string;
  role: string;
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
