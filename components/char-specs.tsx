'use client';

import { useEffect, useState } from 'react';
import { CircleDashed, CircleDotDashed, ScrollText } from 'lucide-react';
import type { CharSpecs } from '@/models/sheet/char-specs';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useSheetStore } from '@/store/sheet-store';
import { useClassStore } from '@/store/class-store';

export function CharSpecs() {
  const { sheet, updateSheetSpecs } = useSheetStore();
  const { charClass } = useClassStore();
  const [charSpecs, setCharSpecs] = useState<CharSpecs>(sheet.specs);

  const handleChange = (
    updatedValue: number,
    field: string,
    attributeType?: string,
    skillType?: string,
  ) => {
    setCharSpecs((prevState) => {
      if (attributeType && skillType) {
        const updatedAttributes = prevState.attributes.map((attr) =>
          attr.type === attributeType
            ? {
                ...attr,
                skills: attr.skills.map((sk) =>
                  sk.type === skillType ? { ...sk, value: updatedValue } : sk,
                ),
              }
            : attr,
        );
        return { ...prevState, attributes: updatedAttributes };
      } else if (attributeType) {
        const updatedAttributes = prevState.attributes.map((attr) =>
          attr.type === attributeType
            ? {
                ...attr,
                [field]: updatedValue,
                modifier: Math.floor((updatedValue - 10) / 2),
              }
            : attr,
        );
        return { ...prevState, attributes: updatedAttributes };
      } else {
        return { ...prevState, [field]: updatedValue };
      }
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateSheetSpecs(charSpecs);
    }, 1000);

    return () => clearTimeout(timeout);
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
                      ? (charClass!.proficiencyByLevel[newLevel] ?? 0)
                      : newLevel > 20
                        ? (charClass!.proficiencyByLevel[20] ?? 0)
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
              <Drawer>
                <DrawerTrigger asChild>
                  <Button className="w-full" variant="outline">
                    <ScrollText />
                    Specs
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle className="text-2xl">Char Specs</DrawerTitle>
                  </DrawerHeader>
                  <section className="flex max-h-[100rem] flex-col gap-4 overflow-y-scroll p-4">
                    {charSpecs.attributes.map((attribute) => {
                      return (
                        <section
                          className="flex flex-col gap-4 rounded-lg border-2 p-4"
                          key={attribute.type}
                        >
                          <div className="items-top flex justify-between gap-2">
                            <div>
                              <Label className="text-2xl">{attribute.type}</Label>
                              <span className="items-bottom flex gap-2">
                                Modifier:{' '}
                                <b>
                                  {attribute.modifier > 0
                                    ? '+' + attribute.modifier
                                    : attribute.modifier}
                                </b>
                              </span>
                            </div>
                            <Input
                              key={attribute.type}
                              className="number-input-md"
                              type="number"
                              value={attribute.value}
                              onChange={(e) =>
                                handleChange(Number(e.target.value), 'value', attribute.type)
                              }
                            />
                          </div>
                          <div>
                            <section className="flex items-center gap-2">
                              {attribute.savingThrow > 0 ? <CircleDotDashed /> : <CircleDashed />}
                              <Input
                                className="number-input-sm"
                                type="number"
                                value={attribute.savingThrow}
                                onChange={(e) =>
                                  handleChange(
                                    Number(e.target.value),
                                    'savingThrow',
                                    attribute.type,
                                  )
                                }
                              />
                              <Label>Saving Throw</Label>
                            </section>
                            {attribute.skills.map((skill) => {
                              return (
                                <section className="flex items-center gap-2" key={skill.type}>
                                  {skill.value > 0 ? <CircleDotDashed /> : <CircleDashed />}
                                  <Input
                                    key={skill.type}
                                    className="number-input-sm"
                                    type="number"
                                    value={skill.value}
                                    onChange={(e) =>
                                      handleChange(
                                        Number(e.target.value),
                                        'value',
                                        attribute.type,
                                        skill.type,
                                      )
                                    }
                                  />
                                  <Label>{skill.type}</Label>
                                </section>
                              );
                            })}
                          </div>
                        </section>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
