import { Attribute } from '@/models/sheet/char-specs';

export const baseAttributes: Array<Attribute> = [
  {
    type: 'Strength',
    value: 0,
    modifier: -5,
    savingThrow: 0,
    skills: [{ type: 'Athletics', value: 0 }],
  },
  {
    type: 'Dexterity',
    value: 0,
    modifier: -5,
    savingThrow: 0,
    skills: [
      { type: 'Acrobatics', value: 0 },
      { type: 'Stealth', value: 0 },
      { type: 'Sleight of Hand', value: 0 },
    ],
  },
  {
    type: 'Constitution',
    value: 0,
    modifier: -5,
    savingThrow: 0,
    skills: [],
  },
  {
    type: 'Intelligence',
    value: 0,
    modifier: -5,
    savingThrow: 0,
    skills: [
      { type: 'Arcana', value: 0 },
      { type: 'History', value: 0 },
      { type: 'Investigation', value: 0 },
      { type: 'Nature', value: 0 },
      { type: 'Religion', value: 0 },
    ],
  },
  {
    type: 'Wisdom',
    value: 0,
    modifier: -5,
    savingThrow: 0,
    skills: [
      { type: 'Insight', value: 0 },
      { type: 'Medicine', value: 0 },
      { type: 'Perception', value: 0 },
      { type: 'Survival', value: 0 },
    ],
  },
  {
    type: 'Charisma',
    value: 0,
    modifier: -5,
    savingThrow: 0,
    skills: [
      { type: 'Deception', value: 0 },
      { type: 'Intimidation', value: 0 },
      { type: 'Performance', value: 0 },
      { type: 'Persuasion', value: 0 },
    ],
  },
];
