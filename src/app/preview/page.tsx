"use client";

import { redirect } from "next/navigation";

import styles from "@/app/preview/page.module.css";
import {
  EditorBackground,
  EditorSection,
  EditorSectionName,
  getColorStyle,
  useLayoutStore,
} from "@/store/layout";
import Link from "next/link";

export default function Preview() {
  const editor = useLayoutStore((state) => state.editor);

  if (!editor) {
    redirect("/");
  }

  const composeStyle = (background: EditorBackground) => {
    return {
      backgroundColor: getColorStyle(background.color),
      backgroundImage: background.image
        ? `url(${URL.createObjectURL(background.image)})`
        : undefined,
    };
  };

  const backgroundStyle = composeStyle(editor.background);

  // Editor Sections
  const header = editor.sections.find((section) => section.name === "Header");
  const columns = editor.sections.filter((section) =>
    section.name.includes("Column")
  );
  const footer = editor.sections.find((section) => section.name === "Footer");

  const renderSection = (section: EditorSection, name: EditorSectionName) => {
    const classes = [styles.section, styles[name.toLowerCase().split(" ")[0]]];

    return (
      <div
        className={classes.join(" ")}
        style={composeStyle(section.background)}
      >
        {section.content ? (
          <p
            className={styles.sectionContent}
            dangerouslySetInnerHTML={{ __html: section.content }}
          ></p>
        ) : null}
      </div>
    );
  };

  return (
    <div className={styles.preview}>
      <header className={styles.topBar}>
        <Link href="/editor" className={styles.back}>
          Back
        </Link>
        <span>Untitled Page</span>
      </header>

      <main className={styles.main} style={backgroundStyle}>
        <div className={styles.content}>
          {header && renderSection(header, header.name)}
          {columns.length && (
            <div className={styles.columnRow}>
              {columns.map((column) => renderSection(column, column.name))}
            </div>
          )}
          {footer && renderSection(footer, footer.name)}
        </div>
      </main>
    </div>
  );
}
