import styles from "./TabBar.module.css";

// Current first iteration on how to display props on the table
export interface TabMode {
  key: string;
  label: string;
}

interface TabBarProps {
  modes: TabMode[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({
  modes,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className={styles.tabContainer}>
      {modes.map((mode) => (
        <button
          key={mode.key}
          className={`${styles.buttonTab} ${
            activeTab === mode.key ? styles.buttonTabActive : ""
          }`}
          onClick={() => onTabChange(mode.key)}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
};
