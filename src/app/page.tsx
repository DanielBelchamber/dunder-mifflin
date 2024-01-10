"use client";

import { useRouter } from "next/navigation";

import { type Layout, LAYOUT_OPTIONS, useLayoutStore } from "@/store/layout";
import styles from "@/app/page.module.css";
import CardRadio from "@/app/components/cardRadio";

export default function Home() {
  const chooseLayout = useLayoutStore((state) => state.chooseLayout);
  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const layout = formData.get("layout") as Layout;
    chooseLayout(layout);
    router.push("/editor");
  };

  return (
    <main className={styles.main}>
      <form onSubmit={onSubmit}>
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
        <CardRadio name={"layout"} options={LAYOUT_OPTIONS} />

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
