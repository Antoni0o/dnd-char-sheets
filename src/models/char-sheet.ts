import InfoModel from './sheet/info/info-model';
import { SpecsModel } from './sheet/specs/specs-model';
import SpellsModel from './sheet/spells/spells-model';

export interface CharSheet {
  info: InfoModel;
  specs: SpecsModel;
  spells?: SpellsModel;
}
