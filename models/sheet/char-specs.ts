export type CharSpecs = {
  ca: number;
  hp: number;
  proficiency: number;
  level: number;
  attributes: Array<Attribute>;
};

export type Attribute = {
  type: string;
  value: number;
  modifier: number;
  savingThrow: number;
  skills: Array<Skill>;
};

export type Skill = {
  type: string;
  value: number;
};
