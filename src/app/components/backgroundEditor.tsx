import { useState } from "react";
import Image from "next/image";

import {
  ContentEditor,
  getBackground,
  getColorStyle,
  getCustomText,
  isValidHexcolor,
  useLayoutStore,
} from "@/store/layout";
import styles from "@/app/components/backgroundEditor.module.css";

export default function BackgroundEditor({
  editor,
}: {
  editor: ContentEditor;
}) {
  const activeComponent = useLayoutStore((state) => state.activeComponent);
  const updateBackground = useLayoutStore((state) => state.updateBackground);
  const updateTextContent = useLayoutStore((state) => state.updateTextContent);
  const [context, setContext] = useState(activeComponent);

  /**
   * Component State Management
   */

  const background = getBackground(activeComponent, editor);
  const customText = getCustomText(activeComponent, editor);

  const getImageSrc = () => {
    return background.image ? URL.createObjectURL(background.image) : "";
  };

  const [src, setSrc] = useState(getImageSrc());

  if (context !== activeComponent) {
    // reset background color field if active component changes
    setContext(activeComponent);

    // update background color field
    const color = document.getElementById(
      "background-color"
    ) as HTMLInputElement;
    color.value = background.color ?? "";

    // update background image file and source
    const image = document.getElementById(
      "background-image"
    ) as HTMLInputElement;
    const source = getImageSrc();
    if (!source) image.value = "";
    setSrc(source);
  }

  /**
   * Background Color Form
   */

  const previewStyle = {
    backgroundColor: getColorStyle(background.color),
  };

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    if (value === "" || isValidHexcolor(value)) {
      updateBackground(activeComponent, { color: value });
    }
  };

  /**
   * Background Image Form
   */

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const image = document.getElementById(
        "background-image"
      ) as HTMLInputElement;
      image.click();
    }
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (!target.files) return;
    const file = target.files.item(0);
    if (!file) return;
    setSrc(URL.createObjectURL(file));
    updateBackground(activeComponent, { image: file });
  };

  const removeImage = () => {
    const image = document.getElementById(
      "background-image"
    ) as HTMLInputElement;
    image.value = "";
    setSrc("");
    updateBackground(activeComponent, { image: undefined });
  };

  /**
   * Custom Text Control
   */

  const addCustomText = () => {
    updateTextContent(activeComponent, "");
  };

  const removeCustomText = () => {
    updateTextContent(activeComponent, undefined);
  };

  return (
    <>
      {/* Background Color */}
      <form className={styles.atomicForm}>
        <h2>Background Color</h2>
        <div className={styles.inputGroup}>
          <label>hex #</label>
          <input
            type="text"
            id="background-color"
            name="color"
            defaultValue={background.color ?? ""}
            onInput={onInput}
            autoComplete="off"
            autoCorrect="off"
          />
          <div className={styles.preview} style={previewStyle}></div>
        </div>
      </form>

      {/* Background Image */}
      <form className={styles.atomicForm}>
        <h2>Background Image</h2>
        {/* conditionally show image preview */}
        {src && (
          <div className={styles.imageBox}>
            <Image
              src={src}
              alt="downloaded image"
              fill
              sizes="100vw"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        )}
        <input
          type="file"
          id="background-image"
          accept="image/*"
          style={{ display: "none" }}
          onChange={onChange}
        />
        {/* show full label if there is no saved image */}
        {!src && (
          <label
            htmlFor="background-image"
            className={styles.imageLabel}
            tabIndex={0}
            onKeyUp={onKeyUp}
          >
            <Image
              src="/image.png"
              alt="image icon"
              width={140}
              height={120}
              priority
            />
            <span>select image</span>
          </label>
        )}
        {/* if there is a saved image, offer options to choose a different one or remove the existing one */}
        {src && (
          <div className={styles.buttonRow}>
            <label
              htmlFor="background-image"
              className={styles.buttonLabel}
              tabIndex={0}
              onKeyUp={onKeyUp}
            >
              Replace
            </label>
            <button onClick={removeImage}>Remove</button>
          </div>
        )}
      </form>

      {/* Text Content Control */}
      <div className={styles.textControl}>
        {activeComponent !== "Background" && customText === undefined && (
          <button onClick={addCustomText}>Add Custom Text</button>
        )}
        {activeComponent !== "Background" && customText !== undefined && (
          <button onClick={removeCustomText}>Remove Custom Text</button>
        )}
      </div>
    </>
  );
}
