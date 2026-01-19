import React from "react";
import { INTERVALS } from "../constants";

interface Props {
  root: string;
  selectedInterval: string;
  onIntervalSelect: (val: string) => void;
}

export const IntervalControls: React.FC<Props> = ({
  root,
  selectedInterval,
  onIntervalSelect,
}) => {
  const currentLabel = INTERVALS.find(
    (i) => i.value === selectedInterval,
  )?.label;

  return (
    <div style={{ marginTop: 20, textAlign: "center" }}>
      <h3>Interval Explorer</h3>
      <p>
        Root: <strong>{root}</strong> + Interval:{" "}
        <strong>{currentLabel}</strong>
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 5,
          justifyContent: "center",
          maxWidth: "600px",
        }}
      >
        {INTERVALS.map((int) => (
          <button
            key={int.value}
            onClick={() => onIntervalSelect(int.value)}
            style={{
              padding: "8px",
              background:
                selectedInterval === int.value ? "#3b82f6" : "#e5e7eb",
              color: selectedInterval === int.value ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {int.label}
          </button>
        ))}
      </div>
    </div>
  );
};
