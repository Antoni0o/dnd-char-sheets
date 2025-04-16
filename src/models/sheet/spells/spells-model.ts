import SpellModel from './spell-model';

export default interface SpellsModel {
  selectedSpells?: Array<SpellModel>;
  classSpells?: Array<SpellModel>;
}
