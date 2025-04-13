import { CharInfo } from './sheet/char-info';
import { CharSpecs } from './sheet/char-specs';
import CharSpellsModel from './sheet/char-spells';

export type CharSheet = {
  info: CharInfo;
  specs: CharSpecs;
  spells?: CharSpellsModel;
};
