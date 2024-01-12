import Image from "next/image";

import {
  ContentEditor,
  getBackground,
  getColorStyle,
  useLayoutStore,
} from "@/store/layout";
import styles from "@/app/components/componentPreview.module.css";
import RichTextField from "@/app/components/richTextField";

export default function ComponentPreview({
  editor,
}: {
  editor: ContentEditor;
}) {
  const showTip = useLayoutStore((state) => state.showTip);
  const activeComponent = useLayoutStore((state) => state.activeComponent);
  const hideTip = useLayoutStore((state) => state.hideTip);

  const background = getBackground(activeComponent, editor);

  const contentStyle = {
    backgroundColor: getColorStyle(background.color),
    backgroundImage: background.image
      ? `url(${URL.createObjectURL(background.image)})`
      : undefined,
  };

  return (
    <div className={styles.content} style={contentStyle}>
      <div className={styles.transparent}></div>
      <div className={styles.active}>{activeComponent}</div>
      {showTip && (
        <p className={styles.instruction}>
          <button className={styles.close} onClick={hideTip}>
            <Image
              src="/close.png"
              alt="close"
              width={12}
              height={12}
              priority
            />
          </button>
          <span>
            Use the panel on the right to add color and/or images to your
            background
          </span>
        </p>
      )}
      <RichTextField editor={editor} />
    </div>
  );
}
