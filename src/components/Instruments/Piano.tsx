import React from "react";
import { Note } from "tonal";
import { JazzNote } from "../../jazzLogic";
import { CHORD_COLORS } from "../../constants/theme.constants";

interface PianoProps {
  startNote: string;
  endNote: string;
  activeNotes: JazzNote[];
  onKeyClick: (noteName: string) => void;
}

export const Piano: React.FC<PianoProps> = ({
  startNote,
  endNote,
  activeNotes,
  onKeyClick,
}) => {
  const startMidi = Note.midi(startNote) || 48;
  const endMidi = Note.midi(endNote) || 72;

  // List the keys between the start note and the end note
  const keys = [];
  for (let i = startMidi; i <= endMidi; i++) {
    keys.push(i);
  }

  // Define keys dimensions
  const WHITE_KEY_WIDTH = 40;
  const WHITE_KEY_HEIGHT = 200;
  const BLACK_KEY_WIDTH = 24;
  const BLACK_KEY_HEIGHT = 120;

  // Define if a note is black
  const isBlack = (midi: number) => {
    const noteName = Note.fromMidi(midi);
    return Note.get(noteName).alt !== 0;
  };

  // Define the root, thirds, 5ths and chord extensions
  const getMatch = (keyMidi: number) => {
    return activeNotes.find((n) => {
      const noteMidi = Note.midi(n.note);

      if (noteMidi !== null) {
        return noteMidi === keyMidi;
      }

      return Note.chroma(n.note) === Note.chroma(Note.fromMidi(keyMidi));
    });
  };

  let xPosition = 0;

  const whiteKeys = keys
    .filter((k) => !isBlack(k))
    .map((midi) => {
      const noteName = Note.fromMidi(midi);
      const currentX = xPosition;
      xPosition += WHITE_KEY_WIDTH;

      const match = getMatch(midi);

      let fill = "white";
      if (match) {
        if (match.role === "Root")
          fill = CHORD_COLORS.root; // Blue
        else if (match.role.includes("Guide"))
          fill = CHORD_COLORS.guideTone; // Green
        else if (match.interval === "9M") fill = CHORD_COLORS.extension;
        else fill = CHORD_COLORS.fifth; // Yellow
      }

      return (
        <rect
          key={midi}
          x={currentX}
          y={0}
          width={WHITE_KEY_WIDTH}
          height={WHITE_KEY_HEIGHT}
          fill={fill}
          stroke="#1e1a1b"
          style={{ cursor: "pointer" }}
          onClick={() => onKeyClick(Note.pitchClass(noteName))}
        />
      );
    });

  // Render Black Keys
  xPosition = 0;

  // Define the black keys based on the position of the white keys
  const blackKeys = keys.map((midi) => {
    if (!isBlack(midi)) {
      xPosition += WHITE_KEY_WIDTH;
      return null;
    }

    const currentX = xPosition - BLACK_KEY_WIDTH / 2;
    const match = getMatch(midi);
    const noteName = Note.fromMidi(midi);

    let fill = "black";
    if (match) {
      if (match.role === "Root") fill = CHORD_COLORS.root;
      else if (match.role.includes("Guide")) fill = CHORD_COLORS.guideTone;
      else if (match.interval === "9M") fill = CHORD_COLORS.extension;
      else fill = CHORD_COLORS.fifth;
    }

    return (
      <rect
        key={midi}
        x={currentX}
        y={0}
        width={BLACK_KEY_WIDTH}
        height={BLACK_KEY_HEIGHT}
        fill={fill}
        stroke="#1e1a1b"
        style={{ cursor: "pointer" }}
        onClick={() => onKeyClick(Note.pitchClass(noteName))}
      />
    );
  });

  return (
    <>
      <svg width={xPosition} height={WHITE_KEY_HEIGHT + 20}>
        {whiteKeys}
        {blackKeys}
      </svg>
    </>
  );
};
