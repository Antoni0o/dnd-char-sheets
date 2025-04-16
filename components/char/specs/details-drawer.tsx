'use client';

import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleDashed, CircleDotDashed, ScrollText } from 'lucide-react';
import type { SpecsModel } from '@/src/models/sheet/specs/specs-model';
import { handleChange } from './handleChange';

type SpecsDetailsProps = {
  specs: SpecsModel;
  setSpecs: React.Dispatch<React.SetStateAction<SpecsModel>>;
};

export function SpecsDetails({ specs: charSpecs, setSpecs: setCharSpecs }: SpecsDetailsProps) {
  return (
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
          <DrawerDescription className="text-sm">
            Here you can edit your character&apos;s specifications, including attributes and saving
            throws.
          </DrawerDescription>
        </DrawerHeader>
        <section className="flex max-h-[100rem] flex-col gap-4 overflow-y-scroll p-4">
          {charSpecs.attributes.map((attribute) => {
            return (
              <section className="flex flex-col gap-4 rounded-lg border-2 p-4" key={attribute.type}>
                <div className="items-top flex justify-between gap-2">
                  <div>
                    <Label className="text-2xl">{attribute.type}</Label>
                    <span className="items-bottom flex gap-2">
                      Modifier:{' '}
                      <b>
                        {attribute.modifier > 0 ? '+' + attribute.modifier : attribute.modifier}
                      </b>
                    </span>
                  </div>
                  <Input
                    key={attribute.type}
                    className="number-input-md"
                    type="number"
                    value={attribute.value}
                    onChange={(e) =>
                      setCharSpecs((prevState) =>
                        handleChange(prevState, Number(e.target.value), 'value', attribute.type),
                      )
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
                        setCharSpecs((prevState) =>
                          handleChange(
                            prevState,
                            Number(e.target.value),
                            'savingThrow',
                            attribute.type,
                          ),
                        )
                      }
                    />
                    <Label>Saving Throw</Label>
                  </section>
                  {attribute.skills.map((skill) => (
                    <section className="flex items-center gap-2" key={skill.type}>
                      {skill.value > 0 ? <CircleDotDashed /> : <CircleDashed />}
                      <Input
                        key={skill.type}
                        className="number-input-sm"
                        type="number"
                        value={skill.value}
                        onChange={(e) =>
                          setCharSpecs((prevState) =>
                            handleChange(
                              prevState,
                              Number(e.target.value),
                              'value',
                              attribute.type,
                              skill.type,
                            ),
                          )
                        }
                      />
                      <Label>{skill.type}</Label>
                    </section>
                  ))}
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
  );
}
