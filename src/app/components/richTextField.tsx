import { useCallback } from "react";
import sanitizeHtml from "sanitize-html";

import { ContentEditor, getCustomText, useLayoutStore } from "@/store/layout";
import styles from "@/app/components/richTextField.module.css";

export default function RichTextField({ editor }: { editor: ContentEditor }) {
  const activeComponent = useLayoutStore((state) => state.activeComponent);
  const updateTextContent = useLayoutStore((state) => state.updateTextContent);

  const customText = getCustomText(activeComponent, editor);

  const onContentBlur = useCallback(
    (e: React.FormEvent<HTMLParagraphElement>) => {
      const sanitizeConfig = {
        allowedTags: ["b", "i", "u"],
      };

      const target = e.target as HTMLParagraphElement;
      const sanitizedContent = sanitizeHtml(target.innerHTML, sanitizeConfig);
      updateTextContent(activeComponent, sanitizedContent);
    },
    [activeComponent, updateTextContent]
  );

  return (
    activeComponent !== "Background" &&
    customText !== undefined && (
      <p
        className={styles.customText}
        contentEditable
        onBlur={onContentBlur}
        dangerouslySetInnerHTML={{ __html: customText }}
      ></p>
    )
  );
}
