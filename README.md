# Jazz Visualizer

A React-based interactive application designed to help musicians visualize jazz theory concepts, specifically focusing on dominant chords, intervals, and ear training. The application uses a virtual piano interface to provide immediate visual feedback for theoretical concepts.

## Application Overview

The Jazz Visualizer allows users to interact with music theory in three distinct modes:

### 1. Interval Explorer

This mode is designed for studying the distance between notes.

- **Functionality:** Users select a specific interval (e.g., Major 3rd, Tritone, Perfect 5th) and a root note on the piano.
- **Visualization:** The application highlights the relationship between the two notes.
  - **Blue Key:** Root Note
  - **Yellow Key:** Target Interval Note

### 2. Quiz Mode (Training)

A gamified environment to test knowledge of intervals and keyboard geography.

- **Gameplay:** The system challenges the user to find a specific interval relative to a random root note (e.g., "Find the Major 3rd of C").
- **Difficulty Settings:**
  - **Timer:** Configurable time limits (15s, 10s, 5s) or untimed mode.
  - **Root Visibility:** Users can toggle whether the root note is visible during the guessing phase to increase difficulty.
- **Feedback:** Immediate visual and text-based feedback is provided for correct or incorrect answers, accompanied by a score tracker.

### 3. Dominant Chord Visualizer

This mode focuses on the construction of Dominant 7th chords.

- **Harmonic Analysis:** Upon selecting a root note, the application constructs the full chord and color-codes the notes based on their harmonic function:
  - **Blue:** Root
  - **Green:** Guide Tones (3rd and 7th) – These are highlighted to emphasize their role in defining the chord's quality.
  - **Yellow:** Chord Tones (5th)

## Tech Stack

- **Framework:** React with TypeScript
- **Build Tool:** Vite
- **Music Theory Engine:** Tonal.js
- **State Management:** React Hooks (Custom hooks for game logic)

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
