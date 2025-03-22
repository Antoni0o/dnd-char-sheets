import { useState } from 'react';
import { CircleDashed, CircleDotDashed, Save, ScrollText } from 'lucide-react';
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
  const { sheet, persistSheet } = useSheetStore();
  const [charSpecs, setCharSpecs] = useState<CharSpecs>({
    level: sheet.specs.level,
    ca: sheet.specs.ca,
    hp: sheet.specs.hp,
    proficiency: sheet.specs.proficiency,
    attributes: sheet.specs.attributes,
  });

  return (
    <section className="rounded-lg border-2 px-2 py-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-2">
            <Label>Level</Label>
            <Input
              className="h-full w-30 rounded-none border-x-0 border-t-0 border-b-2 !bg-transparent pt-0 text-right text-5xl font-bold duration-500 focus:rounded-lg focus:outline-none"
              type="number"
              value={charSpecs.level}
              onChange={(e) => setCharSpecs({ ...charSpecs, level: Number(e.target.value) })}
            ></Input>
          </div>
          <div className="flex flex-col gap-2">
            <Label>CA</Label>
            <Input
              className="h-full w-14 rounded-none border-x-0 border-t-0 border-b-2 !bg-transparent text-right text-2xl font-bold duration-500 focus:rounded-lg focus:outline-none"
              type="number"
              value={charSpecs.ca}
              onChange={(e) => setCharSpecs({ ...charSpecs, ca: Number(e.target.value) })}
            ></Input>
          </div>
          <div className="flex flex-col gap-2">
            <Label>HP</Label>
            <Input
              className="h-full w-14 rounded-none border-x-0 border-t-0 border-b-2 !bg-transparent text-right text-2xl font-bold duration-500 focus:rounded-lg focus:outline-none"
              type="number"
              value={charSpecs.hp}
              onChange={(e) => setCharSpecs({ ...charSpecs, hp: Number(e.target.value) })}
            ></Input>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Proficiency</Label>
            <Input
              className="h-full w-14 rounded-none border-x-0 border-t-0 border-b-2 !bg-transparent text-right text-2xl font-bold duration-500 focus:rounded-lg focus:outline-none"
              type="number"
              value={charSpecs.proficiency}
              onChange={(e) => setCharSpecs({ ...charSpecs, proficiency: Number(e.target.value) })}
            ></Input>
          </div>
        </div>

        <Separator></Separator>

        <div className="flex w-full justify-between gap-2">
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
              <section className="flex max-h-[100rem] flex-col gap-4 overflow-scroll p-4">
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
                          className="h-full w-30 rounded-none border-x-0 border-t-0 border-b-2 !bg-transparent pt-0 text-right text-5xl font-bold duration-500 focus:rounded-lg focus:outline-none"
                          type="number"
                          value={attribute.value}
                          onChange={(e) => {
                            const updatedAttributes = charSpecs.attributes.map((attr) =>
                              attr === attribute
                                ? {
                                    ...attr,
                                    value: Number(e.target.value),
                                    modifier: Math.floor((Number(e.target.value) - 10) / 2),
                                  }
                                : attr,
                            );

                            setCharSpecs({ ...charSpecs, attributes: updatedAttributes });
                          }}
                        ></Input>
                      </div>
                      <div>
                        {attribute.skills.map((skill) => {
                          return (
                            <section className="flex items-center gap-2" key={skill.type}>
                              {skill.value > 0 ? <CircleDotDashed /> : <CircleDashed />}
                              <Input
                                className="h-full w-20 rounded-none border-x-0 border-t-0 border-b-2 !bg-transparent text-right text-2xl font-bold duration-500 focus:rounded-lg focus:outline-none"
                                type="number"
                                value={skill.value}
                                onChange={(e) => {
                                  const updatedValue = Number(e.target.value);

                                  const updatedSkills = attribute.skills.map((sk) =>
                                    sk === skill ? { ...sk, value: updatedValue } : sk,
                                  );

                                  const updatedAttribute = {
                                    ...attribute,
                                    skills: updatedSkills,
                                  };

                                  const updatedAttributes = charSpecs.attributes.map((attr) =>
                                    attr === attribute ? updatedAttribute : attr,
                                  );

                                  setCharSpecs((prevState) => ({
                                    ...prevState,
                                    attributes: updatedAttributes,
                                  }));
                                }}
                              ></Input>
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
                <Button
                  onClick={() => {
                    persistSheet({ ...sheet, specs: charSpecs });
                  }}
                >
                  Save
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <Button
            onClick={() => {
              persistSheet({ ...sheet, specs: charSpecs });
            }}
          >
            <Save />
            Save
          </Button>
        </div>
      </div>
    </section>
  );
}
