// useDrawer.ts
import { useState, useCallback } from "react";
import { AddNote } from "./add-note";

interface DrawerHook {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  NoteComponent: React.FC;
}

export const useNote = (initialState: boolean = false): DrawerHook => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const openDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleDrawer = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const NoteComponent: React.FC = () => (
    <AddNote isOpen={isOpen} setIsOpen={setIsOpen} />
  );

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    NoteComponent,
  };
};
