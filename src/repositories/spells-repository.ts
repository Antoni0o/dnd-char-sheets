import axios from 'axios';
import SpellModel from '../models/sheet/spells/spell-model';
import { Damage, DamageByLevel } from '../models/sheet/spells/spell-damage-models';

type SpellsResponse = { level: number; name: string; index: string };

type SpellResponse = {
  name: string;
  index: string;
  level: number;
  desc: string[];
  components: string[];
  concentration: boolean;
  damage?: {
    damage_type: {
      name: string;
    };
    damage_at_character_level?: {
      [key: string]: string;
    };
  };
  duration: string;
  higher_level: string[];
  material?: string;
  range: string;
  ritual: boolean;
};

export async function fetchSpells(charClass: string) {
  const reponse = await axios.get(`https://www.dnd5eapi.co/api/classes/${charClass}/spells`);

  return reponse.data.results.map((spell: SpellsResponse) => {
    return new SpellModel(spell.name, spell.index, spell.level);
  });
}

export async function fetchSpell(spellIndex: string) {
  const response = await axios.get(`https://www.dnd5eapi.co/api/spells/${spellIndex}`);

  return mapSpell(response.data);
}

function mapSpell(response: SpellResponse): SpellModel {
  return new SpellModel(
    response.name,
    response.index,
    response.level,
    response.desc.join(' '),
    response.components.join(', '),
    response.concentration,
    response.damage
      ? new Damage(
          response.damage.damage_type.name,
          response.damage.damage_at_character_level
            ? Object.entries(response.damage.damage_at_character_level).map(([level, value]) => {
                return new DamageByLevel(Number(level), String(value));
              })
            : [],
        )
      : undefined,
    response.duration,
    response.higher_level.join(),
    response.material || '',
    response.range,
    response.ritual,
  );
}
