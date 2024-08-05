import { create } from "zustand";

interface EditorValueState {
  editorValue: any;
  setEditorValue: (value: any) => void;
}

export const useEditorValueState = create<EditorValueState>((set) => ({
  editorValue: null,
  setEditorValue: (value: any) => set({ editorValue: value }),
}));
