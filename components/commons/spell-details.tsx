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
import { Trash } from 'lucide-react';

type SpellDetailsProps = {
  spell: Spell;
  isSelectable?: boolean;
};

export function SpellDetails({ spell, isSelectable = false }: SpellDetailsProps) {
  const { fetchSpell, selectSpell, deselectSpell } = useSheetStore();
  const [isSpellLoading, setIsSpellLoading] = useState<boolean>(true);
  const [selectedSpell, setSelectedSpell] = useState<Spell>();

  async function handleFetchSpell() {
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
  }

  return (
    <div className="flex w-full cursor-pointer items-center justify-between rounded-lg border-2 p-2 font-bold focus:border-4">
      <Popover key={spell.index}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex justify-start w-6/8"
            onClick={async () => await handleFetchSpell()}
          >
            <div className="mr-2 flex items-center gap-2">
              <Label className="text-md">Level: </Label>
              <span>{spell.level}</span>
            </div>
            <span className="mr-2 font-normal">|</span>
            <span className='text-start w-[40%] truncate'>
              {spell.name}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="overflow-auto w-80">
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
              <div className='flex flex-col'>
                <Label className='text-md'>Damage/Level:</Label>
                {selectedSpell?.damage && (selectedSpell?.damage?.damageByLevel.length && selectedSpell?.damage?.damageByLevel.length > 0) ? (
                  selectedSpell?.damage?.damageByLevel.map((damage) => {
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
      {
        isSelectable ? (
          <Button size="sm" onClick={() => selectSpell(spell.index)}>
            Select
          </Button>
        ) : (
          <Button variant='destructive' size='sm' onClick={() => deselectSpell(spell.index)}><Trash /></Button>
        )
      }
    </div >
  );
}
