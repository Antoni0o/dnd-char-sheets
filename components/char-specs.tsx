import { useEffect, useState } from 'react';
import { CircleDashed, CircleDotDashed, ScrollText } from 'lucide-react';
import type { CharSpecs } from '@/models/char-specs';
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

export function CharSpecs() {
  const { sheet, updateSheetSpecs } = useSheetStore();
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
                value: updatedValue,
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
    }, 2000);

    return () => clearTimeout(timeout);
  }, [charSpecs, updateSheetSpecs]);

  return (
    <section className="rounded-lg border-2 p-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col justify-between gap-4">
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-2">
              <Label>Level</Label>
              <Input
                className="h-full w-30 rounded-none border-x-0 border-t-0 border-b-2 !bg-transparent pt-0 text-right text-5xl font-bold duration-500 focus:rounded-lg focus:outline-none"
                type="number"
                value={charSpecs.level}
                onChange={(e) => setCharSpecs({ ...charSpecs, level: Number(e.target.value) })}
              ></Input>
            </div>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" className="w-1/2">
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
                            className="h-full w-30 rounded-none border-x-0 border-t-0 border-b-2 !bg-transparent pt-0 text-right text-5xl font-bold duration-500 focus:rounded-lg focus:outline-none"
                            type="number"
                            value={attribute.value}
                            onChange={(e) =>
                              handleChange(Number(e.target.value), 'value', attribute.type)
                            }
                          />
                        </div>
                        <div>
                          {attribute.skills.map((skill) => {
                            return (
                              <section className="flex items-center gap-2" key={skill.type}>
                                {skill.value > 0 ? <CircleDotDashed /> : <CircleDashed />}
                                <Input
                                  key={skill.type}
                                  className="h-full w-20 rounded-none border-x-0 border-t-0 border-b-2 !bg-transparent text-right text-2xl font-bold duration-500 focus:rounded-lg focus:outline-none"
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

          <Separator></Separator>

          <div className="flex justify-between">
            <div className="flex flex-col items-end gap-2">
              <Label>CA</Label>
              <Input
                className="h-full w-16 rounded-none border-x-0 border-t-0 border-b-2 !bg-transparent p-0 text-right text-2xl font-bold duration-500 focus:rounded-lg focus:outline-none"
                type="number"
                value={charSpecs.ca}
                onChange={(e) => setCharSpecs({ ...charSpecs, ca: Number(e.target.value) })}
              ></Input>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Label>HP</Label>
              <Input
                className="h-full w-16 rounded-none border-x-0 border-t-0 border-b-2 !bg-transparent p-0 text-right text-2xl font-bold duration-500 focus:rounded-lg focus:outline-none"
                type="number"
                value={charSpecs.hp}
                onChange={(e) => setCharSpecs({ ...charSpecs, hp: Number(e.target.value) })}
              ></Input>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Label>Proficiency</Label>
              <Input
                className="h-full w-16 rounded-none border-x-0 border-t-0 border-b-2 !bg-transparent p-0 text-right text-2xl font-bold duration-500 focus:rounded-lg focus:outline-none"
                type="number"
                value={charSpecs.proficiency}
                onChange={(e) =>
                  setCharSpecs({ ...charSpecs, proficiency: Number(e.target.value) })
                }
              ></Input>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
