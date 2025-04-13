import SpellModel from './spells/spell-model';

export default class CharSpellsModel {
  constructor(
    public selectedSpells?: Array<SpellModel>,
    public classSpells?: Array<SpellModel>,
  ) {}
}
