import { useState } from "react";
import { IntervalSection } from "./components/IntervalSection";
import { ChordSection } from "./components/ChordSection";
import { UI_COLORS } from "./constants/theme.constants";
import { Topic } from "./constants/topic.constants";
import styles from "./App.module.css";

// Placeholder for future sections
const ScalesPlaceholder = () => (
  <div style={{ marginTop: 30 }}>Scales Module Coming Soon</div>
);
const ProgressionsPlaceholder = () => (
  <div style={{ marginTop: 30 }}>Progressions Module Coming Soon</div>
);

function App() {
  const [topic, setTopic] = useState<Topic>("intervals");

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Jazz Visualizer</h1>

        {/* MAIN TOPIC NAVIGATION */}
        <div className={styles.topicNav}>
          {(["intervals", "scales", "chords", "progressions"] as Topic[]).map(
            (t) => (
              <button
                key={t}
                onClick={() => setTopic(t)}
                className={`${styles.topicButton} ${topic === t ? styles.topicButtonActive : ""}`}
                style={{
                  // Dynamic colors from theme constants stay as inline styles
                  background:
                    topic === t
                      ? UI_COLORS.primary
                      : UI_COLORS.backgroundDarker,
                  color: topic === t ? "white" : "black",
                }}
              >
                {t}
              </button>
            ),
          )}
        </div>

        {/* RENDER ACTIVE SECTION */}
        {topic === "intervals" && <IntervalSection />}
        {topic === "chords" && <ChordSection />}
        {topic === "scales" && <ScalesPlaceholder />}
        {topic === "progressions" && <ProgressionsPlaceholder />}
      </div>
    </div>
  );
}

export default App;
