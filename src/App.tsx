import { useState } from "react";
import { IntervalSection } from "./components/IntervalSection";
import { ChordSection } from "./components/ChordSection";

// Placeholder for future sections
const ScalesPlaceholder = () => (
  <div style={{ marginTop: 30 }}>Scales Module Coming Soon</div>
);
const ProgressionsPlaceholder = () => (
  <div style={{ marginTop: 30 }}>Progressions Module Coming Soon</div>
);

type Topic = "intervals" | "scales" | "chords" | "progressions";

function App() {
  const [topic, setTopic] = useState<Topic>("intervals");

  return (
    <>
      <style>{`html, body, #root { margin: 0; padding: 0; width: 100%; height: 100%; }`}</style>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          minHeight: "100vh",
          width: "100vw",
          fontFamily: "sans-serif",
          color: "#333",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ marginBottom: 10 }}>Jazz Visualizer</h1>

          {/* MAIN TOPIC NAVIGATION */}
          <div
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 20,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {(["intervals", "scales", "chords", "progressions"] as Topic[]).map(
              (t) => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  style={{
                    padding: "10px 20px",
                    fontWeight: topic === t ? "bold" : "normal",
                    background: topic === t ? "#1f2937" : "#e5e7eb", // Darker active state
                    color: topic === t ? "white" : "black",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    textTransform: "capitalize",
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
    </>
  );
}

export default App;
