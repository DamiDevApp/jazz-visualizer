import React from "react";
import { Note } from "@tonaljs/tonal"; // Ignore the deprecation for now, it still functions
import { JazzNote } from "../jazzLogic";

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
  const whiteKeyWidth = 40;
  const whiteKeyHeight = 200;
  const blackKeyWidth = 24;
  const blackKeyHeight = 120;

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
      xPosition += whiteKeyWidth;

      const match = getMatch(midi);

      let fill = "white";
      if (match) {
        if (match.role === "Root")
          fill = "#60a5fa"; // Blue
        else if (match.role.includes("Guide"))
          fill = "#34d399"; // Green
        else if (match.interval === "9M") fill = "#f472b6";
        else fill = "#fbbf24"; // Yellow
      }

      return (
        <rect
          key={midi}
          x={currentX}
          y={0}
          width={whiteKeyWidth}
          height={whiteKeyHeight}
          fill={fill}
          stroke="black"
          style={{ cursor: "pointer" }}
          onClick={() => onKeyClick(Note.pitchClass(noteName))}
        />
      );
    });

  // Render Black Keys
  xPosition = 0;

  // Define the black keys based on the position of the black keys
  const blackKeys = keys.map((midi) => {
    if (!isBlack(midi)) {
      xPosition += whiteKeyWidth;
      return null;
    }

    const currentX = xPosition - blackKeyWidth / 2;
    const match = getMatch(midi);
    const noteName = Note.fromMidi(midi);

    let fill = "black";
    if (match) {
      if (match.role === "Root") fill = "#3b82f6";
      else if (match.role.includes("Guide")) fill = "#10b981";
      else if (match.interval === "9M") fill = "#f472b6";
      else fill = "#f59e0b";
    }

    return (
      <rect
        key={midi}
        x={currentX}
        y={0}
        width={blackKeyWidth}
        height={blackKeyHeight}
        fill={fill}
        stroke="black"
        style={{ cursor: "pointer" }}
        onClick={() => onKeyClick(Note.pitchClass(noteName))}
      />
    );
  });

  return (
    <>
      {/* Internal Style for Hover Effect */}
      <style>
        {`
          .piano-key { cursor: pointer; transition: opacity 0.1s; }
          .piano-key:hover { opacity: 0.8; }
        `}
      </style>
      <svg width={xPosition} height={whiteKeyHeight + 20}>
        {whiteKeys}
        {blackKeys}
      </svg>
    </>
  );
};
