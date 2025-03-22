'use client';

import { useSheetStore } from '@/store/sheet-store';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { Button } from './ui/button';
import { Book } from 'lucide-react';
import { Spell } from '@/models/char-spells';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export function CharSpells() {
  const { sheet, fetchSpell, selectSpell } = useSheetStore();
  const [selectedSpell, setSelectedSpell] = useState<Spell>();

  return (
    <section className="flex flex-col justify-between gap-2 rounded-lg border-2 p-4">
      <h2 className="text-xl font-bold">Spells</h2>

      {sheet.spells?.selectedSpells ? (
        sheet.spells?.selectedSpells!.map((spellOfSpellList) => {
          return (
            <Popover key={spellOfSpellList.index}>
              <PopoverTrigger>
                <span
                  className="flex w-full cursor-pointer items-center justify-between rounded-lg border-2 p-2 font-bold focus:border-4"
                  onClick={async () => setSelectedSpell(await fetchSpell(spellOfSpellList.index))}
                >
                  <div className="flex">
                    <div className="mr-2 flex items-center gap-2">
                      <Label className="text-md">Level: </Label>
                      <span>{spellOfSpellList.level}</span>
                    </div>
                    <span className="mr-2 font-normal">|</span>
                    {spellOfSpellList.name}
                  </div>
                </span>
              </PopoverTrigger>
              <PopoverContent className="w-96">
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
                          <DialogDescription>{selectedSpell?.desc}</DialogDescription>
                        </DialogHeader>
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
              </PopoverContent>
            </Popover>
          );
        })
      ) : (
        <>No spells!</>
      )}

      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <Book /> More Spells
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-2xl">Warlock Spells</DrawerTitle>
          </DrawerHeader>
          <section className="flex max-h-[100rem] w-full flex-col gap-4 overflow-y-scroll p-4">
            {sheet.spells?.classSpells.map((spell) => {
              return (
                <Popover key={spell.index}>
                  <PopoverTrigger>
                    <span
                      className="flex w-full cursor-pointer items-center justify-between rounded-lg border-2 p-2 font-bold focus:border-4"
                      onClick={async () => setSelectedSpell(await fetchSpell(spell.index))}
                    >
                      <div className="flex">
                        <div className="mr-2 flex items-center gap-2">
                          <Label className="text-md">Level: </Label>
                          <span>{spell.level}</span>
                        </div>
                        <span className="mr-2 font-normal">|</span>
                        {spell.name}
                      </div>
                      <Button size="sm" onClick={() => selectSpell(spell.index)}>
                        Select
                      </Button>
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="w-96">
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
                              <DialogDescription>{selectedSpell?.desc}</DialogDescription>
                            </DialogHeader>
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
                  </PopoverContent>
                </Popover>
              );
            })}
          </section>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>
  );
}
