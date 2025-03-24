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
import { SpellDetails } from './commons/spell-details';
import { useState } from 'react';
import { Loading } from './commons/loading';

type CharSpellsProps = {
  dndClass: string;
};

export function CharSpells({ dndClass }: CharSpellsProps) {
  const [isSpellLoading, setIsSpellLoading] = useState<boolean>(true);
  const { sheet, fetchSpells } = useSheetStore();

  return (
    <section className="flex flex-col justify-between gap-2 rounded-lg border-2 p-4">
      <h2 className="text-xl font-bold">Spells</h2>

      {sheet.spells?.selectedSpells || sheet.spells!.selectedSpells!.length > 0 ? (
        sheet.spells?.selectedSpells!.map((spellOfSpellList) => {
          return <SpellDetails key={spellOfSpellList.index} spell={spellOfSpellList} />;
        })
      ) : (
        <>No spells!</>
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
              }, 500);
            }}
          >
            <Book /> More Spells
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-2xl capitalize">{dndClass} Spells</DrawerTitle>
          </DrawerHeader>
          <section className="flex max-h-[100rem] w-full flex-col gap-4 overflow-x-hidden overflow-y-scroll p-4">
            {!isSpellLoading ? (
              sheet.spells?.classSpells.map((spell) => {
                return <SpellDetails key={spell.index} spell={spell} isSelectable />;
              })
            ) : (
              <Loading message={`${dndClass} spells is loading`} />
            )}
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
