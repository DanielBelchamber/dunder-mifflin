import { ContentSection, Layout } from "@/store/layout";
import styles from "@/app/components/activeDisplay.module.css";

const VECTOR_SIZE = 150;
const FILL_COLOR = "#d8d8d8";
const DEFAULT_COLOR = "#989898";
const HIGHLIGHT_COLOR = "#01c466";

export default function ActiveDisplay({
  layout,
  active,
}: {
  layout: Layout;
  active: ContentSection;
}) {
  const backgroundStyle =
    active === "Background"
      ? `${styles.background} ${styles.active}`
      : styles.background;

  return (
    <div className={backgroundStyle}>
      <svg
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
        width={VECTOR_SIZE}
        height={VECTOR_SIZE}
      >
        {/* Header */}
        {["header_2columns", "header_3columns"].includes(layout) && (
          <rect
            x="10"
            y="10"
            width="280"
            height="130"
            fill={FILL_COLOR}
            stroke={active === "Header" ? HIGHLIGHT_COLOR : DEFAULT_COLOR}
            strokeWidth={active === "Header" ? "3" : "1"}
          />
        )}
        {layout === "headerfooter_2columns" && (
          <rect
            x="10"
            y="10"
            width="280"
            height="80"
            fill={FILL_COLOR}
            stroke={active === "Header" ? HIGHLIGHT_COLOR : DEFAULT_COLOR}
            strokeWidth={active === "Header" ? "3" : "1"}
          />
        )}

        {/* Columns */}
        {layout === "header_2columns" && (
          <>
            <rect
              x="10"
              y="160"
              width="130"
              height="130"
              fill={FILL_COLOR}
              stroke={active === "Column 1" ? HIGHLIGHT_COLOR : DEFAULT_COLOR}
              strokeWidth={active === "Column 1" ? "3" : "1"}
            />
            <rect
              x="160"
              y="160"
              width="130"
              height="130"
              fill={FILL_COLOR}
              stroke={active === "Column 2" ? HIGHLIGHT_COLOR : DEFAULT_COLOR}
              strokeWidth={active === "Column 2" ? "3" : "1"}
            />
          </>
        )}
        {layout === "header_3columns" && (
          <>
            <rect
              x="10"
              y="160"
              width="80"
              height="130"
              fill={FILL_COLOR}
              stroke={active === "Column 1" ? HIGHLIGHT_COLOR : DEFAULT_COLOR}
              strokeWidth={active === "Column 1" ? "3" : "1"}
            />
            <rect
              x="110"
              y="160"
              width="80"
              height="130"
              fill={FILL_COLOR}
              stroke={active === "Column 2" ? HIGHLIGHT_COLOR : DEFAULT_COLOR}
              strokeWidth={active === "Column 2" ? "3" : "1"}
            />
            <rect
              x="210"
              y="160"
              width="80"
              height="130"
              fill={FILL_COLOR}
              stroke={active === "Column 3" ? HIGHLIGHT_COLOR : DEFAULT_COLOR}
              strokeWidth={active === "Column 3" ? "3" : "1"}
            />
          </>
        )}
        {layout === "headerfooter_2columns" && (
          <>
            <rect
              x="10"
              y="110"
              width="130"
              height="130"
              fill={FILL_COLOR}
              stroke={active === "Column 1" ? HIGHLIGHT_COLOR : DEFAULT_COLOR}
              strokeWidth={active === "Column 1" ? "3" : "1"}
            />
            <rect
              x="160"
              y="110"
              width="130"
              height="130"
              fill={FILL_COLOR}
              stroke={active === "Column 2" ? HIGHLIGHT_COLOR : DEFAULT_COLOR}
              strokeWidth={active === "Column 2" ? "3" : "1"}
            />
          </>
        )}

        {/* Footer */}
        {layout === "headerfooter_2columns" && (
          <rect
            x="10"
            y="260"
            width="280"
            height="30"
            fill={FILL_COLOR}
            stroke={active === "Footer" ? HIGHLIGHT_COLOR : DEFAULT_COLOR}
            strokeWidth={active === "Footer" ? "3" : "1"}
          />
        )}
      </svg>
    </div>
  );
}
