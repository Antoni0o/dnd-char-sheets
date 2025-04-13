'use client';

import { useSheetStore } from '@/src/store/sheet-store';
import { Book } from 'lucide-react';
import React, { useState } from 'react';
import { Loading } from '../../commons/loading';
import { Button } from '../../ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../../ui/drawer';
import { Spell } from './spell';

type CharSpellsProps = {
  dndClass: string;
};

export const CharSpells = React.memo(function CharSpells({ dndClass }: CharSpellsProps) {
  const [isSpellLoading, setIsSpellLoading] = useState<boolean>(true);
  const { sheet, fetchSpells } = useSheetStore();

  return (
    <section className="flex flex-col justify-between gap-2 rounded-lg border-2 p-4">
      <h2 className="text-xl font-bold">Spells</h2>

      {sheet.spells?.selectedSpells && sheet.spells!.selectedSpells!.length > 0 ? (
        sheet.spells?.selectedSpells!.map((spellOfSpellList) => {
          return <Spell key={spellOfSpellList.index} spell={spellOfSpellList} />;
        })
      ) : (
        <span className="mb-2 font-bold italic">No Spell selected.</span>
      )}

      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            onClick={() => {
              setIsSpellLoading(true);

              fetchSpells(dndClass);

              setTimeout(() => {
                setIsSpellLoading(false);
              }, 1000);
            }}
          >
            <Book /> More Spells
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-2xl capitalize">{dndClass} Spells</DrawerTitle>
            <DrawerDescription className="text-sm">
              Here you can select your character&apos;s spells. Click on a spell to view its details
              and select it. You can also deselect spells you no longer want.
            </DrawerDescription>
          </DrawerHeader>
          <section className="flex max-h-[100rem] w-full flex-col gap-4 overflow-x-hidden overflow-y-scroll p-4">
            {!isSpellLoading ? (
              sheet.spells?.classSpells?.map((spell) => {
                return <Spell key={spell.index} spell={spell} isSelectable />;
              })
            ) : (
              <Loading message={`${dndClass} spells is loading`} />
            )}
          </section>
        </DrawerContent>
      </Drawer>
    </section>
  );
});
