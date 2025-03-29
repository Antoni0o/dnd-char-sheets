import CharClass from '@/models/char-class';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createJSONStorage, persist } from 'zustand/middleware';
import { baseClasses } from './baseValues/baseClasses';

interface ClassStore {
  charClass: CharClass | null;
  setCharClass: (className: string) => void;
}

export const useClassStore = create<ClassStore>()(
  persist(
    immer((set) => ({
      charClass: null,
      setCharClass: (className: string) => {
        const foundClass = baseClasses.find((charClass) => charClass.name === className);

        if (foundClass) {
          set({ charClass: foundClass });
        }
      },
    })),
    {
      name: 'DnD:Class',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
