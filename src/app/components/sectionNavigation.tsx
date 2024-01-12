import Image from "next/image";

import {
  ContentEditor,
  EditorComponentName,
  EditorSection,
  useLayoutStore,
} from "@/store/layout";
import styles from "@/app/components/sectionNavigation.module.css";

export default function SectionNavigation({
  editor,
}: {
  editor: ContentEditor;
}) {
  const activeComponent = useLayoutStore((state) => state.activeComponent);
  const setActiveComponent = useLayoutStore(
    (state) => state.setActiveComponent
  );

  const getSectionStyle = (section: EditorComponentName) => {
    if (section === activeComponent) {
      return [styles.section, styles.active].join(" ");
    } else {
      return styles.section;
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const components = [editor.background, ...editor.sections];
    const index = components.findIndex(
      (component, index) =>
        (index === 0 && activeComponent === "Background") ||
        (component as EditorSection).name === activeComponent
    );
    if (index > 0 && (event.key === "ArrowUp" || event.key === "ArrowLeft")) {
      if (index - 1 === 0) setActiveComponent("Background");
      else setActiveComponent((components[index - 1] as EditorSection).name);
    } else if (
      index < components.length - 1 &&
      (event.key === "ArrowDown" || event.key === "ArrowRight")
    ) {
      setActiveComponent((components[index + 1] as EditorSection).name);
    }
  };

  return (
    <nav className={styles.nav} tabIndex={0} onKeyUp={handleKeyUp}>
      <div
        className={getSectionStyle("Background")}
        onClick={() => setActiveComponent("Background")}
      >
        <div className={styles.iconWrapper}>
          <Image
            src={
              activeComponent === "Background"
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
          onClick={() => setActiveComponent(section.name)}
        >
          <div className={styles.iconWrapper}>
            <Image
              src={
                activeComponent === section.name
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
  );
}
