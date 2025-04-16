'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { SpecsModel } from '@/src/models/sheet/specs/specs-model';
import { useClassStore } from '@/src/store/class-store';
import { useSheetStore } from '@/src/store/sheet-store';
import React, { useEffect, useRef, useState } from 'react';
import { SpecsDetails } from './details-drawer';

export function Specs() {
  const { sheet, updateSheetSpecs } = useSheetStore();
  const { charClass } = useClassStore();
  const [specs, setSpecs] = useState<SpecsModel>(sheet.specs);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSpecs(sheet.specs);
  }, [sheet.specs]);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      updateSheetSpecs(specs);
    }, 1000);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [specs, updateSheetSpecs]);

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
                value={specs.level}
                onChange={(e) => {
                  const newLevel = Number(e.target.value);

                  const newProficiency =
                    newLevel > 0 && newLevel <= 20
                      ? charClass!.proficiencyByLevel[newLevel - 1]
                      : newLevel > 20
                        ? charClass!.proficiencyByLevel[19]
                        : 0;

                  setSpecs((prev) => ({
                    ...prev,
                    level: newLevel,
                    proficiency: newProficiency,
                  }));
                }}
              ></Input>
            </div>

            <div className="flex flex-col items-start justify-end gap-2">
              <Label>Proficiency</Label>
              <span className="w-full border-b-2 text-right font-bold">{specs.proficiency}</span>
            </div>
          </div>

          <Separator></Separator>

          <div className="flex gap-4">
            <div className="flex flex-col items-end gap-2">
              <Label>CA</Label>
              <Input
                className="number-input-sm"
                type="number"
                value={specs.ca}
                onChange={(e) => setSpecs({ ...specs, ca: Number(e.target.value) })}
              ></Input>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Label>HP</Label>
              <Input
                className="number-input-sm"
                type="number"
                value={specs.hp}
                onChange={(e) => setSpecs({ ...specs, hp: Number(e.target.value) })}
              ></Input>
            </div>
            <div className="flex w-full items-end">
              <SpecsDetails specs={specs} setSpecs={setSpecs} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
