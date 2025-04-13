'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { CharSpecs } from '@/src/models/sheet/char-specs';
import { useClassStore } from '@/src/store/class-store';
import { useSheetStore } from '@/src/store/sheet-store';
import React, { useEffect, useRef, useState } from 'react';
import { SpecsDetails } from './details-drawer';

export function CharSpecs() {
  const { sheet, updateSheetSpecs } = useSheetStore();
  const { charClass } = useClassStore();
  const [charSpecs, setCharSpecs] = useState<CharSpecs>(sheet.specs);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCharSpecs(sheet.specs);
  }, [sheet.specs]);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      updateSheetSpecs(charSpecs);
    }, 1000);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [charSpecs, updateSheetSpecs]);

  return (
    <section className="rounded-lg border-2 p-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col justify-between gap-4">
          <div className="flex w-full gap-4">
            <div className="flex flex-col gap-2">
              <Label>Level</Label>
              <Input
                className="number-input-md"
                type="number"
                value={charSpecs.level}
                onChange={(e) => {
                  const newLevel = Number(e.target.value);

                  const newProficiency =
                    newLevel > 0 && newLevel <= 20
                      ? charClass!.proficiencyByLevel[newLevel - 1]
                      : newLevel > 20
                        ? charClass!.proficiencyByLevel[19]
                        : 0;

                  setCharSpecs((prev) => ({
                    ...prev,
                    level: newLevel,
                    proficiency: newProficiency,
                  }));
                }}
              ></Input>
            </div>

            <div className="flex flex-col items-start justify-end gap-2">
              <Label>Proficiency</Label>
              <span className="w-full border-b-2 text-right font-bold">
                {charSpecs.proficiency}
              </span>
            </div>
          </div>

          <Separator></Separator>

          <div className="flex gap-4">
            <div className="flex flex-col items-end gap-2">
              <Label>CA</Label>
              <Input
                className="number-input-sm"
                type="number"
                value={charSpecs.ca}
                onChange={(e) => setCharSpecs({ ...charSpecs, ca: Number(e.target.value) })}
              ></Input>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Label>HP</Label>
              <Input
                className="number-input-sm"
                type="number"
                value={charSpecs.hp}
                onChange={(e) => setCharSpecs({ ...charSpecs, hp: Number(e.target.value) })}
              ></Input>
            </div>
            <div className="flex w-full items-end">
              <SpecsDetails charSpecs={charSpecs} setCharSpecs={setCharSpecs} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
