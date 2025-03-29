import CharClass from '@/models/char-class';

const defaultProficiencyByLevel: Array<number> = [
  2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6,
];

export const baseClasses: Array<CharClass> = [
  new CharClass('warlock', true, defaultProficiencyByLevel),
  new CharClass('wizard', true, defaultProficiencyByLevel),
  new CharClass('cleric', true, defaultProficiencyByLevel),
  new CharClass('barbarian', false, defaultProficiencyByLevel),
  new CharClass('paladin', true, defaultProficiencyByLevel),
];
