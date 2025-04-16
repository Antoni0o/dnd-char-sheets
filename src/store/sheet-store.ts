import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { CharSheet } from '@/src/models/char-sheet';
import { SpecsModel } from '@/src/models/sheet/specs/specs-model';
import InfoModel from '../models/sheet/info/info-model';
import SpellModel from '../models/sheet/spells/spell-model';
import { fetchSpell, fetchSpells } from '../repositories/spells-repository';
import { toggleSpell } from '../services/spell-service';
import { baseSheet } from './baseValues/baseSheet';

interface SheetStore {
  sheet: CharSheet;
  getSheet: () => CharSheet;
  clearSheet: () => void;
  updateSheetInfo: (newSheetInfo: InfoModel) => void;
  updateSheetSpecs: (newSheetSpecs: SpecsModel) => void;
  toggleSpell: (spellIndex: string) => void;
  fetchSpell: (spellIndex: string) => Promise<SpellModel>;
  fetchSpells: (charClass: string) => Promise<void>;
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

      updateSheetInfo: (newInfo: InfoModel) => {
        set((state) => {
          state.sheet.info = newInfo;
        });
      },

      updateSheetSpecs: (newSpecs: SpecsModel) => {
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

          if (result.shouldUpdate) state.sheet.spells = result.updatedSpells;
        });
      },
    })),
    {
      name: 'Grimoria:Sheet',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
