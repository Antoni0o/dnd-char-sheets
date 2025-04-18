import { Button } from '../../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { useSheetStore } from '@/src/store/sheet-store';
import React, { useState } from 'react';
import { Loading } from '../../commons/loading';
import { Label } from '../../ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Trash } from 'lucide-react';
import { DamageByLevel } from '@/src/models/sheet/spells/spell-damage-models';
import SpellModel from '@/src/models/sheet/spells/spell-model';

type SpellProps = {
  spell: SpellModel;
  isSelectable?: boolean;
};

export const Spell = React.memo(function SpellDetails({ spell, isSelectable = false }: SpellProps) {
  const { fetchSpell, toggleSpell } = useSheetStore();
  const [isSpellLoading, setIsSpellLoading] = useState<boolean>(true);
  const [selectedSpell, setSelectedSpell] = useState<SpellModel>();

  const damageByLevel = selectedSpell?.damage?.damageByLevel ?? [];

  async function handleFetchSpell() {
    if (selectedSpell) return;

    setIsSpellLoading(true);
    try {
      const fetchedSpell = await fetchSpell(spell.index);
      setSelectedSpell(fetchedSpell);
    } catch (error) {
      console.error('Failed to fetch spell:', error);
    } finally {
      setIsSpellLoading(false);
    }
  }

  return (
    <div className="flex w-full cursor-pointer items-center justify-between rounded-lg border-2 p-2 font-bold focus:border-4">
      <Popover key={spell.index}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex w-6/8 justify-start"
            onClick={() => handleFetchSpell()}
          >
            <div className="mr-2 flex items-center gap-2">
              <Label className="text-md">Level: </Label>
              <span>{spell.level}</span>
            </div>
            <span className="mr-2 font-normal">|</span>
            <span className="w-[40%] truncate text-start" title={spell.name}>
              {spell.name}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 overflow-auto">
          {!isSpellLoading ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col justify-start">
                <div className="flex items-center gap-2">
                  <Label className="text-md">Duration: </Label>
                  <span>{selectedSpell?.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-md">Range: </Label>
                  <span>{selectedSpell?.range}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <Label className="text-md">Damage/Level:</Label>
                {selectedSpell?.damage && damageByLevel.length && damageByLevel.length > 0 ? (
                  damageByLevel.map((damage: DamageByLevel) => {
                    return (
                      <div key={damage.level}>
                        <b>Level {damage.level}: </b>
                        <span>{damage.value}</span>
                      </div>
                    );
                  })
                ) : (
                  <>No damage by level</>
                )}
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="mt-4">
                    More Info
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{selectedSpell?.name}</DialogTitle>
                    <DialogDescription className="max-h-60 overflow-y-auto text-justify">
                      <b>Description: </b>
                      {selectedSpell?.desc && selectedSpell.desc.trim() !== ''
                        ? selectedSpell.desc
                        : 'No description available.'}
                    </DialogDescription>
                  </DialogHeader>
                  <span>
                    <b>Components: </b>
                    {selectedSpell?.components}
                  </span>
                  <span>
                    <b>Material: </b>
                    {selectedSpell?.material || 'No Material found.'}
                  </span>
                  <span>
                    <b>Higher Level: </b>
                    {selectedSpell?.higherLevel || 'No Higher Level found.'}
                  </span>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <Loading message="Spell content is loading..." />
          )}
        </PopoverContent>
      </Popover>
      {isSelectable ? (
        <Button size="sm" disabled={spell.isSelected} onClick={() => toggleSpell(spell.index)}>
          Select
        </Button>
      ) : (
        <Button variant="destructive" size="sm" onClick={() => toggleSpell(spell.index)}>
          <Trash />
        </Button>
      )}
    </div>
  );
});
