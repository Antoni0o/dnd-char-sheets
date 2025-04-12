export default class CharClass {
  public name: string;
  public canUseSpells: boolean;
  public proficiencyByLevel: Array<number>;

  constructor(name: string, canUseSpells: boolean, proficiencyByLevel: Array<number>) {
    this.name = name;
    this.canUseSpells = canUseSpells;
    this.proficiencyByLevel = proficiencyByLevel;
  }
}
