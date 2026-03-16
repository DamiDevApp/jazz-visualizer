import React from "react";
import { INTERVALS } from "../../constants/intervals.constants";
import styles from "./IntervalControls.module.css";

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
    <div className={styles.container}>
      <h3>Interval Explorer</h3>
      <p>
        Root: <strong>{root}</strong> + Interval:{" "}
        <strong>{currentLabel}</strong>
      </p>

      <div className={styles.intervalsContainer}>
        {INTERVALS.map((int) => (
          <button
            key={int.value}
            onClick={() => onIntervalSelect(int.value)}
            className={`${styles.button} ${selectedInterval === int.value ? styles.buttonActive : ""}`}
          >
            {int.label}
          </button>
        ))}
      </div>
    </div>
  );
};
