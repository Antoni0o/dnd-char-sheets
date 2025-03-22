import { toast } from 'sonner';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import axios from 'axios';

import { CharInfo } from '@/models/char-info';
import { CharSheet } from '@/models/char-sheet';
import { CharSpecs } from '@/models/char-specs';
import { CharSpells, Damage, Spell } from '@/models/char-spells';
import { baseAttributes } from '@/utils/baseAttributes';

interface SheetStore {
  sheet: CharSheet;
  persistSheet: (newSheet: CharSheet) => void;
  fetchSheet: () => void;
  getSheet: () => CharSheet;
  selectSpell: (spellIndex: string) => void;
  fetchSpell: (spellIndex: string) => Promise<Spell>;
  fetchSpells: (charClass: string) => void;
  // startupSpellSlots: (charClass: string) => void;
}

type fetchSpellsResponse = { level: number; name: string; index: string };

export const useSheetStore = create<SheetStore>()(
  immer((set, get) => ({
    sheet: <CharSheet>{
      info: <CharInfo>{
        name: '',
        age: 0,
        height: 0,
        weight: 0,
        history: '',
      },
      specs: <CharSpecs>{
        level: 0,
        ca: 0,
        hp: 0,
        proficiency: 0,
        attributes: baseAttributes,
      },
      spells: <CharSpells>{
        spellLevels: [],
        classSpells: [],
        selectedSpells: [],
      },
    },
    persistSheet: (newSheet: CharSheet) => {
      set({ sheet: newSheet });

      localStorage.setItem('DnD:Sheet', JSON.stringify(newSheet));

      toast.info('Char Sheet updated');
    },
    fetchSheet: () => {
      const storageSheet = localStorage.getItem('DnD:Sheet');

      let parsedSheet = null;
      if (storageSheet) parsedSheet = JSON.parse(storageSheet);

      const defaultSheet = <CharSheet>{
        info: <CharInfo>{
          name: '',
          age: 0,
          height: 0,
          weight: 0,
          history: '',
        },
        specs: <CharSpecs>{
          level: 0,
          ca: 0,
          hp: 0,
          proficiency: 0,
          attributes: baseAttributes,
        },
        spells: <CharSpells>{
          spellLevels: [],
          selectedSpells: [],
          classSpells: [],
        },
      };

      if (parsedSheet) set({ sheet: parsedSheet });
      else set({ sheet: defaultSheet });
    },
    getSheet: (): CharSheet => {
      return get().sheet;
    },
    fetchSpells: (charClass: string) => {
      axios.get(`https://www.dnd5eapi.co/api/2014/classes/${charClass}/spells`).then((res) => {
        const spellsRes = res.data.results;

        set((state) => {
          if (!state.sheet.spells) {
            state.sheet.spells = { spellLevels: [], selectedSpells: [], classSpells: [] };
          }

          state.sheet.spells.classSpells = spellsRes.map((spell: fetchSpellsResponse) => ({
            level: spell.level,
            name: spell.name,
            index: spell.index,
          }));
        });

        localStorage.setItem('DnD:Sheet', JSON.stringify(get().sheet));
      });
    },
    selectSpell: (spellIndex: string) => {
      set((state) => {
        const selectedSpell = state.sheet.spells?.classSpells.find(
          (spell) => spell.index === spellIndex,
        );

        if (selectedSpell) {
          state.sheet.spells?.selectedSpells?.push(selectedSpell);
          localStorage.setItem('DnD:Sheet', JSON.stringify(state.sheet));
          toast('Spell <b>' + selectedSpell.name + '</b> selected!');
        } else toast.error('Selected Spell not found!');
      });
    },
    fetchSpell: async (spellIndex: string) => {
      const res = await axios.get(`https://www.dnd5eapi.co/api/2014/spells/${spellIndex}`);
      console.log(res);
      return <Spell>{
        desc: res.data.desc.join(' '),
        name: res.data.name,
        index: res.data.index,
        level: res.data.level,
        components: res.data.components.join(', '),
        concentration: res.data.concentration,
        damage: res.data.damage
          ? <Damage>{
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
      };
    },
    // startupSpellSlots: (charClass: string) => {
    //   if (charClass === 'Warlock') {
    //     set((state) => {
    //       if (!state.sheet.spells) {
    //         state.sheet.spells = { spellLevels: [], selectedSpells: [], classSpells: [] };
    //       }

    //       state.sheet.spells!.spellLevels = [
    //         <SpellLevel>{
    //           level: 1,
    //           knownSpellsCount: 2,
    //           knownSpells: [{ isUsed: false }, { isUsed: false }],
    //         },
    //       ];
    //     });
    //   }
    // },
    // updateSpellSlotsBasedOnLevel: () => {
    //   set((state) => {
    //     const { level } = state.sheet.specs;

    //     const currentSpellData = warlockSpellTable.find((entry) => entry.level === level);
    //     if (!currentSpellData) return;

    //     state.sheet.spells!.spellLevels = [
    //       {
    //         level: currentSpellData.slotLevel,
    //         knownSpellsCount: currentSpellData.knownSpells,
    //         knownSpells: Array.from({ length: currentSpellData.slots }, () => ({
    //           isUsed: false,
    //           selectedSpells: [],
    //         })),
    //       },
    //     ];
    //   });
    // },
  })),
);
