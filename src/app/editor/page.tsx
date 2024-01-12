"use client";

import { redirect } from "next/navigation";

import { useLayoutStore } from "@/store/layout";
import styles from "@/app/editor/page.module.css";
import ActiveDisplay from "@/app/components/activeDisplay";
import SectionNavigation from "@/app/components/sectionNavigation";
import BackgroundEditor from "@/app/components/backgroundEditor";
import ComponentPreview from "../components/componentPreview";

export default function Editor() {
  const editor = useLayoutStore((state) => state.editor);
  const activeComponent = useLayoutStore((state) => state.activeComponent);

  if (!editor) {
    redirect("/");
  }

  return (
    <div className={styles.editor}>
      <header className={styles.header}>Untitled Page</header>

      <main className={styles.main}>
        {/* left - editor outline and navigation */}
        <section className={styles.side}>
          {/* editor outline */}
          <div className={styles.outline}>
            <h1>{editor.layout.label}</h1>
            <ActiveDisplay layout={editor.layout.id} active={activeComponent} />
          </div>

          {/* active section navigation */}
          <SectionNavigation sections={editor.sections} />
        </section>

        {/* center - content editor */}
        <ComponentPreview />

        {/* right - background editor */}
        <div className={styles.side}>
          <BackgroundEditor />
        </div>
      </main>
    </div>
  );
}
