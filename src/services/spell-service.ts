import { toast } from 'sonner';
import SpellsModel from '../models/sheet/spells/spells-model';

export function toggleSpell(spells: SpellsModel, spellIndex: string) {
  const spellToToggle = spells.classSpells?.find((spell) => spell.index === spellIndex);

  if (!spellToToggle) {
    toast.error('Spell not found!');
    return { shouldUpdate: false };
  }

  const selectedIndex = spells.selectedSpells?.findIndex((spell) => spell.index === spellIndex);
  const isSelected = selectedIndex !== -1;

  const newSelectedSpells = spells.selectedSpells ? [...spells.selectedSpells] : [];
  const newClassSpells = spells.classSpells ? [...spells.classSpells] : [];

  if (isSelected && selectedIndex !== undefined) {
    newSelectedSpells.splice(selectedIndex, 1);
    toast.warning(`Spell [${spellToToggle.name}] deselected!`);
  } else {
    spellToToggle.isSelected = true;
    newSelectedSpells.push(spellToToggle);
    toast.success(`Spell [${spellToToggle.name}] selected!`);
  }

  const updatedClassSpells = newClassSpells.map((spell) =>
    spell.index === spellIndex ? { ...spell, isSelected: !isSelected } : spell,
  );

  return {
    shouldUpdate: true,
    updatedSpells: {
      classSpells: updatedClassSpells,
      selectedSpells: newSelectedSpells,
    },
  };
}
