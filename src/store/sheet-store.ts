import { toast } from 'sonner';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';

import { CharInfo } from '@/src/models/sheet/char-info';
import { CharSheet } from '@/src/models/char-sheet';
import { CharSpecs } from '@/src/models/sheet/char-specs';
import { SpellModel } from '@/src/models/sheet/char-spells';
import { baseSheet } from './baseValues/baseSheet';

interface SheetStore {
  sheet: CharSheet;
  clearSheet: () => void;
  updateSheetInfo: (newSheetInfo: CharInfo) => void;
  updateSheetSpecs: (newSheetSpecs: CharSpecs) => void;
  persistSheet: (newSheet: CharSheet) => void;
  getSheet: () => CharSheet;
  selectSpell: (spellIndex: string) => void;
  deselectSpell: (spellIndex: string) => void;
  fetchSpell: (spellIndex: string) => Promise<SpellModel>;
  fetchSpells: (charClass: string) => void;
}

type fetchSpellsResponse = { level: number; name: string; index: string };

export const useSheetStore = create<SheetStore>()(
  persist(
    immer((set, get) => ({
      sheet: baseSheet,

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

      persistSheet: (newSheet: CharSheet) => {
        set({ sheet: newSheet });

        toast.info('Char Sheet updated');
      },

      getSheet: (): CharSheet => {
        return get().sheet;
      },

      fetchSpells: (charClass: string) => {
        axios.get(`https://www.dnd5eapi.co/api/classes/${charClass}/spells`).then((res) => {
          const spellsRes = res.data.results;

          set((state) => {
            state.sheet.spells!.classSpells = spellsRes.map((spell: fetchSpellsResponse) => ({
              level: spell.level,
              name: spell.name,
              index: spell.index,
            }));
          });
        });
      },

      selectSpell: (spellIndex: string) => {
        set((state) => {
          const selectedSpell = state.sheet.spells?.classSpells.find(
            (spell) => spell.index === spellIndex,
          );

          if (selectedSpell) {
            state.sheet.spells?.selectedSpells?.push(selectedSpell);

            selectedSpell.isSelected = true;
            toast.success(`Spell [${selectedSpell.name}] selected!`);
          } else {
            toast.error('Selected Spell not found!');
          }
        });
      },

      deselectSpell: (spellIndex: string) => {
        set((state) => {
          const deselectedSpellIndex = state.sheet.spells?.selectedSpells?.findIndex(
            (spell) => spell.index === spellIndex,
          );
          const deselectedClassSpell = state.sheet.spells?.classSpells.find(
            (spell) => spell.index === spellIndex,
          );

          if (deselectedSpellIndex !== -1 && deselectedClassSpell) {
            const [deselectedSpell] = state.sheet.spells!.selectedSpells!.splice(
              deselectedSpellIndex!,
              1,
            );

            deselectedClassSpell.isSelected = false;
            toast.warning(`Spell [${deselectedSpell.name}] deselected!`);
          } else {
            toast.error('Spell not found!');
          }
        });
      },

      fetchSpell: async (spellIndex: string) => {
        const res = await axios.get(`https://www.dnd5eapi.co/api/spells/${spellIndex}`);
        return {
          desc: res.data.desc.join(' '),
          name: res.data.name,
          index: res.data.index,
          level: res.data.level,
          components: res.data.components.join(', '),
          concentration: res.data.concentration,
          damage: res.data.damage
            ? {
                damageByLevel: res.data.damage.damage_at_character_level
                  ? Object.entries(res.data.damage.damage_at_character_level).map(
                      ([level, value]) => ({
                        level: Number(level),
                        value,
                      }),
                    )
                  : [],
                damageType: res.data.damage.damage_type.name,
              }
            : undefined,
          duration: res.data.duration,
          higherLevel: res.data.higher_level.join(),
          material: res.data.material || '',
          range: res.data.range,
          ritual: res.data.ritual,
        } as SpellModel;
      },
    })),
    {
      name: 'DnD:Sheet',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
