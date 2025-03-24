import { Spell } from '@/models/char-spells';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useSheetStore } from '@/store/sheet-store';
import { useState } from 'react';
import { Loading } from './loading';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

type SpellDetailsProps = {
  spell: Spell;
  isSelectable?: boolean;
};

export function SpellDetails({ spell, isSelectable = false }: SpellDetailsProps) {
  const { fetchSpell, selectSpell } = useSheetStore();
  const [isSpellLoading, setIsSpellLoading] = useState<boolean>(true);
  const [selectedSpell, setSelectedSpell] = useState<Spell>();

  return (
    <div className="flex w-full cursor-pointer items-center justify-between rounded-lg border-2 p-2 font-bold focus:border-4">
      <Popover key={spell.index}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={`flex justify-start ${isSelectable ? 'w-62' : 'w-full'}`}
            onClick={async () => {
              setIsSpellLoading(true);
              try {
                const fetchedSpell = await fetchSpell(spell.index);
                setSelectedSpell(fetchedSpell);
              } catch (error) {
                console.error('Failed to fetch spell:', error);
              } finally {
                setTimeout(() => {
                  setIsSpellLoading(false);
                }, 1000);
              }
            }}
          >
            <div className="flex">
              <div className="mr-2 flex items-center gap-2">
                <Label className="text-md">Level: </Label>
                <span>{spell.level}</span>
              </div>
              <span className="mr-2 font-normal">|</span>
              <span className={`truncate ${isSelectable ? 'max-w-40' : 'w-full'}`}>
                {spell.name}
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96">
          {!isSpellLoading ? (
            <div className="flex justify-between">
              <div className="flex flex-col justify-start">
                <div className="flex items-center gap-2">
                  <Label className="text-md">Duration: </Label>
                  <span>{selectedSpell?.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-md">Range: </Label>
                  <span>{selectedSpell?.range}</span>
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
                      <DialogDescription className="max-h-60 overflow-y-scroll text-justify">
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
                      {selectedSpell?.material}
                    </span>
                    <span>
                      <b>Higher Level: </b>
                      {selectedSpell?.higherLevel || 'No Higher Level Found'}
                    </span>
                  </DialogContent>
                </Dialog>
              </div>
              <div>
                <Label className="text-lg">Damage:</Label>
                {selectedSpell?.damage ? (
                  selectedSpell?.damage?.damageByLevel.map((damage) => {
                    return (
                      <div key={damage.level}>
                        <b>Level {damage.level}: </b>
                        <span>{damage.value}</span>
                      </div>
                    );
                  })
                ) : (
                  <>No damage provided</>
                )}
              </div>
            </div>
          ) : (
            <Loading message="Spell content is loading..." />
          )}
        </PopoverContent>
      </Popover>
      {isSelectable && (
        <Button size="sm" onClick={() => selectSpell(spell.index)}>
          Select
        </Button>
      )}
    </div>
  );
}
