import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { CharSheet } from '@/src/models/char-sheet';
import { CharInfo } from '@/src/models/sheet/char-info';
import { CharSpecs } from '@/src/models/sheet/char-specs';
import { toggleSpell } from '../services/spell-service';
import SpellModel from '../models/sheet/spells/spell-model';
import { fetchSpell, fetchSpells } from '../repositories/spells-repository';
import { baseSheet } from './baseValues/baseSheet';

interface SheetStore {
  sheet: CharSheet;
  getSheet: () => CharSheet;
  clearSheet: () => void;
  updateSheetInfo: (newSheetInfo: CharInfo) => void;
  updateSheetSpecs: (newSheetSpecs: CharSpecs) => void;
  toggleSpell: (spellIndex: string) => void;
  fetchSpell: (spellIndex: string) => Promise<SpellModel>;
  fetchSpells: (charClass: string) => void;
}

export const useSheetStore = create<SheetStore>()(
  persist(
    immer((set, get) => ({
      sheet: baseSheet,

      getSheet: (): CharSheet => {
        return get().sheet;
      },

      clearSheet: () => {
        set({ sheet: baseSheet });

        toast.success('Char Sheet cleared!');
      },

      updateSheetInfo: (newInfo: CharInfo) => {
        set((state) => {
          state.sheet.info = newInfo;
        });
      },

      updateSheetSpecs: (newSpecs: CharSpecs) => {
        set((state) => {
          state.sheet.specs = newSpecs;
        });
      },

      fetchSpells: async (charClass: string) => {
        const response = await fetchSpells(charClass);

        set((state) => {
          state.sheet.spells!.classSpells = response;
        });
      },

      fetchSpell: async (spellIndex: string): Promise<SpellModel> => {
        const response = await fetchSpell(spellIndex);
        return response;
      },

      toggleSpell: (spellIndex: string) => {
        set((state) => {
          const result = toggleSpell(state.sheet.spells ?? {}, spellIndex);

          if (!result.shouldUpdate) return {};

          return {
            sheet: {
              ...state.sheet,
              spells: result.updatedSpells,
            },
          };
        });
      },
    })),
    {
      name: 'DnD:Sheet',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
