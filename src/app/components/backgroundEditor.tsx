import { useState } from "react";
import Image from "next/image";

import {
  getBackground,
  getColorStyle,
  isValidHexcolor,
  useLayoutStore,
} from "@/store/layout";
import styles from "@/app/components/backgroundEditor.module.css";

export default function BackgroundEditor() {
  const editor = useLayoutStore((state) => state.editor);
  const activeComponent = useLayoutStore((state) => state.activeComponent);
  const updateBackground = useLayoutStore((state) => state.updateBackground);
  const [context, setContext] = useState(activeComponent);
  const [src, setSrc] = useState("");

  if (!editor) return null;

  const background = getBackground(activeComponent, editor);

  // background color form

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
    image.value = "";
    setSrc(background.image ? URL.createObjectURL(background.image) : "");
  }

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

  // background image form

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

  return (
    <>
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
          <label htmlFor="background-image" className={styles.imageLabel}>
            <Image
              src="/image.png"
              alt="image icon"
              width={140}
              height={100}
              priority
            />
            <span>select image</span>
          </label>
        )}
        {/* if there is a saved image, offer options to choose a different one or remove the existing one */}
        {src && (
          <div className={styles.buttonRow}>
            <label htmlFor="background-image" className={styles.buttonLabel}>
              replace
            </label>
            <button onClick={removeImage}>remove</button>
          </div>
        )}
      </form>
    </>
  );
}
