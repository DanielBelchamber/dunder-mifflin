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

export type EditorBackground = {
  color?: string;
  image?: File;
};

export type EditorSectionName =
  | "Header"
  | "Column 1"
  | "Column 2"
  | "Column 3"
  | "Footer";

export type EditorSection = {
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

export type EditorComponentName = EditorSectionName | "Background";

// exported functions

export const getBackground = (
  componentName: EditorComponentName,
  editor: ContentEditor
): EditorBackground => {
  return componentName === "Background"
    ? editor.background
    : editor.sections.find((section) => section.name === componentName)!
        .background; // HACK: I know this will always be found
};

export const isValidHexcolor = (hexcolor: string): boolean => {
  const regex = /^([0-9a-f]{3}){1,2}$/i;
  return regex.test(hexcolor);
};

export const getColorStyle = (color?: string): string => {
  if (!color || !isValidHexcolor(color)) return "transparent";
  else return `#${color}`;
};

// useLayoutStore

type State = {
  editor: ContentEditor | null;
  showTip: boolean;
  activeComponent: EditorComponentName;
};

type Actions = {
  chooseLayout: (layout: Layout) => void;
  hideTip: () => void;
  setActiveComponent: (activeSection: EditorComponentName) => void;
  updateBackground: (
    component: EditorComponentName,
    background: EditorBackground
  ) => void;
};

export const useLayoutStore = create<State & Actions>((set) => ({
  editor: null,
  showTip: true,
  activeComponent: "Background",
  chooseLayout: (layout) => set({ editor: createEditor(layout) }),
  hideTip: () => set({ showTip: false }),
  setActiveComponent: (activeComponent) => set({ activeComponent }),
  updateBackground: (component, background) => {
    if (component === "Background") {
      set((state) => ({
        editor: state.editor
          ? {
              ...state.editor,
              background: { ...state.editor.background, ...background },
            }
          : null,
      }));
    } else {
      set((state) => ({
        editor: state.editor
          ? {
              ...state.editor,
              sections: state.editor.sections.map((section) =>
                section.name === component
                  ? {
                      ...section,
                      background: { ...section.background, ...background },
                    }
                  : section
              ),
            }
          : null,
      }));
    }
  },
}));
