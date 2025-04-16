'use client';

import { useSheetStore } from '@/src/store/sheet-store';
import { Book } from 'lucide-react';
import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { FixedSizeList as List, ListOnScrollProps } from 'react-window';
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
import SpellModel from '@/src/models/sheet/spells/spell-model';

type CharSpellsProps = {
  dndClass: string;
};

export function Spells({ dndClass }: CharSpellsProps) {
  const [visibleSpells, setVisibleSpells] = useState<SpellModel[]>([]);
  const [loadedCount, setLoadedCount] = useState(50);
  const [isSpellLoading, setIsSpellLoading] = useState<boolean>(false);
  const { sheet, fetchSpells } = useSheetStore();

  useEffect(() => {
    const loadSpells = async () => {
      if (!sheet.spells?.classSpells) {
        setIsSpellLoading(true);
        try {
          await fetchSpells(dndClass);
        } finally {
          setIsSpellLoading(false);
        }
      }
    };

    loadSpells();
  }, [dndClass, fetchSpells, sheet.spells?.classSpells]);

  useEffect(() => {
    if (sheet.spells?.classSpells) {
      setVisibleSpells(sheet.spells.classSpells.slice(0, loadedCount));
    }
  }, [sheet.spells?.classSpells, loadedCount]);

  const handleLoadMore = useCallback(() => {
    if (
      sheet.spells &&
      sheet.spells?.classSpells &&
      loadedCount < sheet.spells.classSpells.length
    ) {
      setLoadedCount((prev) => Math.min(prev + 20, sheet.spells!.classSpells!.length));
    }
  }, [sheet.spells?.classSpells, loadedCount]);

  const handleScroll = useCallback(
    debounce((props: ListOnScrollProps) => {
      // eslint-disable-next-line react/prop-types
      const { scrollOffset, scrollUpdateWasRequested } = props;

      if (scrollUpdateWasRequested) return;

      const containerHeight = 300;
      const totalContentHeight = visibleSpells.length * 60;
      const tolerance = 60;

      const isNearBottom = scrollOffset + containerHeight >= totalContentHeight - tolerance;

      if (isNearBottom) {
        handleLoadMore();
      }
    }, 200),
    [handleLoadMore, visibleSpells.length],
  );

  return (
    <section className="flex flex-col justify-between gap-2 rounded-lg border-2 p-4">
      <h2 className="text-xl font-bold">Spells</h2>

      {sheet.spells?.selectedSpells && sheet.spells?.selectedSpells?.length > 0 ? (
        sheet.spells.selectedSpells.map((spell) => <Spell key={spell.index} spell={spell} />)
      ) : (
        <span className="mb-2 font-bold italic">No Spell selected.</span>
      )}

      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
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
          <section className="flex max-h-[100rem] w-full flex-col p-4">
            {!isSpellLoading ? (
              <List
                height={300}
                itemCount={visibleSpells.length}
                itemSize={60}
                width="100%"
                onScroll={handleScroll}
              >
                {({ index, style }) => (
                  <div style={style}>
                    <Spell
                      key={visibleSpells[index].index}
                      spell={visibleSpells[index]}
                      isSelectable
                    />
                  </div>
                )}
              </List>
            ) : (
              <Loading message={`${dndClass} spells is loading`} />
            )}
          </section>
        </DrawerContent>
      </Drawer>
    </section>
  );
}
