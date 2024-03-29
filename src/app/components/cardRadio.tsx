"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";

import { type LayoutOption } from "@/store/layout";
import styles from "@/app/components/cardRadio.module.css";

export default function CardRadio({
  name,
  options,
}: {
  name: string;
  options: LayoutOption[];
}) {
  const [selected, setSelected] = useState<string>("header_2columns");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.value;
    setSelected(selected);
  };

  const isSelected = (id: string) => selected === id;

  const checkedOption = [styles.labeledGraphicCard, styles.checked].join(" ");

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const index = options.findIndex((option) => option.id === selected);
    if (index > 0 && (event.key === "ArrowUp" || event.key === "ArrowLeft")) {
      const newSelected = options[index - 1].id;
      setSelected(newSelected);
    } else if (
      index < options.length - 1 &&
      (event.key === "ArrowDown" || event.key === "ArrowRight")
    ) {
      const newSelected = options[index + 1].id;
      setSelected(newSelected);
    }
  };

  return (
    <div
      className={styles.cardRadio}
      tabIndex={0}
      onKeyUp={handleKeyUp}
      onMouseDown={(e) => e.preventDefault()}
    >
      {options.map((option) => (
        <div
          key={option.id}
          className={
            isSelected(option.id) ? checkedOption : styles.labeledGraphicCard
          }
        >
          <input
            type="radio"
            name={name}
            id={option.id}
            value={option.id}
            checked={isSelected(option.id)}
            onChange={onChange}
          />
          <label htmlFor={option.id}>
            <div className={styles.graphic}>
              <Image
                src={option.svg}
                alt={option.alt}
                width={400}
                height={400}
                priority
              />
            </div>

            <div>{option.label}</div>
          </label>
        </div>
      ))}
    </div>
  );
}
