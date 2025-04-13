import { CharSheet } from '@/src/models/char-sheet';
import { baseAttributes } from './baseAttributes';

export const baseSheet = <CharSheet>{
  info: {
    name: '',
    age: 0,
    height: 0,
    weight: 0,
    history: '',
    race: '',
    antecedent: '',
    trend: '',
  },
  specs: {
    level: 0,
    ca: 0,
    hp: 0,
    proficiency: 0,
    attributes: baseAttributes,
  },
  spells: {
    spellLevels: [],
    classSpells: [],
    selectedSpells: [],
  },
};
