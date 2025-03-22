export type CharSpells = {
  spellLevels: Array<SpellLevel>;
  selectedSpells?: Array<Spell>;
  classSpells: Array<Spell>;
};

export type SpellLevel = {
  level: number;
  knownSpellsCount: number;
  knownSpells: Array<Slot>;
};

export type Slot = {
  isUsed: boolean;
  selectedSpell?: Spell;
};

export type Spell = {
  index: string;
  name: string;
  level: number;
  desc?: string;
  higherLevel?: string;
  range?: string;
  components?: Array<string>;
  material?: string;
  ritual?: boolean;
  concentration?: boolean;
  duration?: string;
  damage?: Damage;
};

export type Damage = {
  damageType: string;
  damageByLevel: Array<DamageByLevel>;
};

export type DamageByLevel = {
  level: number;
  value: string;
};
