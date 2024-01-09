"use client";

import styles from "@/app/page.module.css";
import { chooseLayout } from "@/app/actions";
import CardRadio, { type CardRadioOption } from "@/app/components/cardRadio";

const options: CardRadioOption[] = [
  {
    id: "header_2columns",
    label: "Header - Two Columns",
    svg: "/header_2columns.svg",
    alt: "header with two columns",
  },
  {
    id: "header_3columns",
    label: "Header - Three Columns",
    svg: "/header_3columns.svg",
    alt: "header with three columns",
  },
  {
    id: "headerfooter_2columns",
    label: "Header/Footer - Two Columns",
    svg: "/headerfooter_2columns.svg",
    alt: "header and footer with two columns",
  },
];

export default function Home() {
  const onRadioSelect = (id: string) => {
    console.log(id);
  };

  return (
    <main className={styles.main}>
      <form action={chooseLayout}>
        {/* Content here is taken directly from 'Feature Details' but modified for clarity and to match 'Project Requirements' */}
        <section className={styles.description}>
          <h1>Select a layout for your single page website</h1>
          <p>
            When choosing your layout there are several things you can
            customize:
          </p>
          <ul>
            <li>
              The background color, or you can use a large image as the
              background
            </li>
            <li>
              Any section can likewise contain a background image or color
            </li>
            <li>Each section can also contain custom text</li>
          </ul>
        </section>

        {/* Use labeled graphic cards as radio options */}
        <CardRadio name={"layout"} options={options} onSelect={onRadioSelect} />

        {/* Form footer with a submit button that functions as a wizard navigation */}
        <div className={styles.footer}>
          <input
            type="submit"
            value="Next"
            className={styles.submit}
            onMouseDown={(e) => e.preventDefault()}
          />
        </div>
      </form>
    </main>
  );
}
