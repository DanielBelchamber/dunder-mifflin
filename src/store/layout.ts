import { create } from "zustand";

/**
 * In theory, much of this could be provided via the server,
 * but as this is a POC Front-End project, I'm going to keep
 * it simple and just hard-code the options here.
 */

export type Layout =
  | "header_2columns"
  | "header_3columns"
  | "headerfooter_2columns";

export type LayoutOption = {
  id: Layout;
  label: string;
  svg: string;
  alt: string;
};

export const LAYOUT_OPTIONS: LayoutOption[] = [
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

type EditorBackground = {
  color?: string;
  image?: string;
};

export type EditorSectionName =
  | "Header"
  | "Column 1"
  | "Column 2"
  | "Column 3"
  | "Footer";

type EditorSection = {
  name: EditorSectionName;
  background: EditorBackground;
  content: string; // TODO: allow rich text
};

type ContentEditor = {
  layout: LayoutOption;
  background: EditorBackground;
  sections: EditorSection[];
};

const createEmptySection = (name: EditorSectionName): EditorSection => ({
  name,
  background: {},
  content: "",
});

const createEditor = (layout: Layout): ContentEditor => {
  switch (layout) {
    case "header_2columns":
      return {
        layout: LAYOUT_OPTIONS[0],
        background: {},
        sections: [
          createEmptySection("Header"),
          createEmptySection("Column 1"),
          createEmptySection("Column 2"),
        ],
      };
    case "header_3columns":
      return {
        layout: LAYOUT_OPTIONS[1],
        background: {},
        sections: [
          createEmptySection("Header"),
          createEmptySection("Column 1"),
          createEmptySection("Column 2"),
          createEmptySection("Column 3"),
        ],
      };
    case "headerfooter_2columns":
      return {
        layout: LAYOUT_OPTIONS[2],
        background: {},
        sections: [
          createEmptySection("Header"),
          createEmptySection("Column 1"),
          createEmptySection("Column 2"),
          createEmptySection("Footer"),
        ],
      };
  }
};

export type ContentSection = EditorSectionName | "Background";

type State = {
  editor: ContentEditor | null;
  activeSection: ContentSection;
};

type Actions = {
  chooseLayout: (layout: Layout) => void;
  setActiveSection: (activeSection: ContentSection) => void;
  updateContent: (editor: ContentEditor) => void;
};

export const useLayoutStore = create<State & Actions>((set) => ({
  editor: null,
  activeSection: "Background",
  chooseLayout: (layout) => set({ editor: createEditor(layout) }),
  setActiveSection: (activeSection) => set({ activeSection }),
  updateContent: (editor) => set({ editor }),
}));
