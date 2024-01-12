import Image from "next/image";

import {
  EditorComponentName,
  EditorSection,
  useLayoutStore,
} from "@/store/layout";
import styles from "@/app/components/sectionNavigation.module.css";

export default function SectionNavigation({
  sections,
}: {
  sections: EditorSection[];
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

  return (
    <nav className={styles.nav}>
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
      {sections.map((section) => (
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
