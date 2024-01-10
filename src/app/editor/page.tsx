"use client";

import Image from "next/image";
import { redirect } from "next/navigation";

import { ContentSection, useLayoutStore } from "@/store/layout";
import styles from "@/app/editor/page.module.css";
import ActiveDisplay from "@/app/components/activeDisplay";

export default function Editor() {
  const editor = useLayoutStore((state) => state.editor);
  const activeSection = useLayoutStore((state) => state.activeSection);
  const setActiveSection = useLayoutStore((state) => state.setActiveSection);

  if (!editor) {
    redirect("/");
  }

  const getSectionStyle = (section: ContentSection) => {
    if (section === activeSection) {
      return [styles.section, styles.active].join(" ");
    } else {
      return styles.section;
    }
  };

  return (
    <div className={styles.editor}>
      <header className={styles.header}>Untitled Page</header>

      <main className={styles.main}>
        {/* left - editor outline and navigation */}
        <section className={styles.side}>
          {/* editor outline */}
          <div className={styles.outline}>
            <h1>{editor.layout.label}</h1>
            <ActiveDisplay layout={editor.layout.id} active={activeSection} />
          </div>

          {/* active section navigation */}
          <nav className={styles.nav}>
            <div
              className={getSectionStyle("Background")}
              onClick={() => setActiveSection("Background")}
            >
              <div className={styles.iconWrapper}>
                <Image
                  src={
                    activeSection === "Background"
                      ? "/computer_white.png"
                      : "/computer_black.png"
                  }
                  alt={"background icon"}
                  width={18}
                  height={18}
                  priority
                />
              </div>
              <span>Background</span>
            </div>
            {editor.sections.map((section) => (
              <div
                key={section.name}
                className={getSectionStyle(section.name)}
                onClick={() => setActiveSection(section.name)}
              >
                <div className={styles.iconWrapper}>
                  <Image
                    src={
                      activeSection === section.name
                        ? "/square_white.png"
                        : "/square_black.png"
                    }
                    alt={"section icon"}
                    width={14}
                    height={14}
                    priority
                  />
                </div>
                <span>{section.name}</span>
              </div>
            ))}
          </nav>
        </section>

        {/* center - content editor */}
        <div className={styles.content}>
          <div className={styles.active}>{activeSection}</div>
        </div>

        {/* right - background editor */}
        <div className={styles.side}></div>
      </main>
    </div>
  );
}
