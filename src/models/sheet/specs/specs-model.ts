export interface SpecsModel {
  ca: number;
  hp: number;
  proficiency: number;
  level: number;
  attributes: Array<Attribute>;
}

export interface Attribute {
  type: string;
  value: number;
  modifier: number;
  savingThrow: number;
  skills: Array<Skill>;
}

export interface Skill {
  type: string;
  value: number;
}
