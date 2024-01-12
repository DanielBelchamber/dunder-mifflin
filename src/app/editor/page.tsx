"use client";

import { redirect } from "next/navigation";
import Link from "next/link";

import { useLayoutStore } from "@/store/layout";
import useWindowDimensions from "@/scripts/useWindowDimensions";
import styles from "@/app/editor/page.module.css";
import ActiveDisplay from "@/app/components/activeDisplay";
import SectionNavigation from "@/app/components/sectionNavigation";
import BackgroundEditor from "@/app/components/backgroundEditor";
import ComponentPreview from "@/app/components/componentPreview";
import { useState } from "react";
import Image from "next/image";

export default function Editor() {
  const editor = useLayoutStore((state) => state.editor);
  const activeComponent = useLayoutStore((state) => state.activeComponent);
  const windowDimensions = useWindowDimensions();
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);

  if (!editor) {
    redirect("/");
  }

  const pageWidth = windowDimensions.width ?? 0;
  if (pageWidth >= 960) {
    if (!showLeft) setShowLeft(true);
    if (!showRight) setShowRight(true);
  } else if (pageWidth > 0) {
    if (showLeft && showRight) {
      setShowLeft(false);
      setShowRight(false);
    }
  }

  const toggleNavigation = () => {
    setShowLeft(!showLeft);
    setShowRight(false);
  };

  const toggleComponentEditor = () => {
    setShowLeft(false);
    setShowRight(!showRight);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLImageElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.click();
    }
  };

  return (
    <div className={styles.editor}>
      <header className={styles.header}>
        {pageWidth < 960 && (
          <Image
            src="/hamburger.png"
            alt="open navigation"
            width={30}
            height={30}
            priority
            tabIndex={0}
            onMouseDown={(e) => e.preventDefault()}
            onClick={toggleNavigation}
            onKeyDown={onKeyDown}
          />
        )}
        <span>Untitled Page</span>
        {pageWidth < 960 && (
          <Image
            src="/gear.png"
            alt="open component editor"
            width={36}
            height={36}
            priority
            tabIndex={0}
            onMouseDown={(e) => e.preventDefault()}
            onClick={toggleComponentEditor}
            onKeyDown={onKeyDown}
          />
        )}
      </header>

      <main className={styles.main}>
        {/* left - editor outline and navigation */}
        {showLeft && (
          <section className={styles.side}>
            {/* editor outline */}
            <div className={styles.outline}>
              <h1>{editor.layout.label}</h1>
              <ActiveDisplay
                layout={editor.layout.id}
                active={activeComponent}
              />
            </div>

            {/* active section navigation */}
            <SectionNavigation editor={editor} />

            {/* link to preview page */}
            <div className={styles.linkWrapper}>
              <Link className={styles.linkAction} href="/preview">
                Preview Full Page
              </Link>
            </div>
          </section>
        )}

        {/* center - content editor */}
        <ComponentPreview editor={editor} />

        {/* right - background editor */}
        {showRight && (
          <div className={styles.side}>
            <BackgroundEditor editor={editor} />
          </div>
        )}
      </main>
    </div>
  );
}
