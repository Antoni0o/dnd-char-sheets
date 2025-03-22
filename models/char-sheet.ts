import { CharInfo } from './char-info';
import { CharSpecs } from './char-specs';
import { CharSpells } from './char-spells';

export type CharSheet = {
  info: CharInfo;
  specs: CharSpecs;
  spells?: CharSpells;
};
