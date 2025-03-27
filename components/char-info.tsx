import { useState, useEffect } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Separator } from './ui/separator';
import { Book } from 'lucide-react';
import { useSheetStore } from '@/store/sheet-store';

export function CharInfo() {
  const { sheet, updateSheetInfo } = useSheetStore();
  const [charInfo, setCharInfo] = useState(sheet.info);

  const handleChange = (key: keyof typeof charInfo, value: string | number) => {
    setCharInfo((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateSheetInfo(charInfo);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [charInfo, updateSheetInfo]);

  return (
    <section className="mt-4 flex items-center justify-between rounded-lg border-2 p-2">
      <div className="flex gap-4">
        <Label className="text-xl">Name:</Label>
        <span className="h-full max-w-32 truncate text-xl font-bold">{charInfo.name}</span>
      </div>
      <div className="flex items-center">
        <Separator className="mx-2 h-2" orientation="vertical" />
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">
              <Book /> More Info
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-2xl">Character Info</DrawerTitle>
            </DrawerHeader>

            <section className='overflow-y-auto p-4 gap-2 flex flex-col'>
              <div className="flex flex-col gap-2">
                <Label>Name:</Label>
                <Input value={charInfo.name} onChange={(e) => handleChange('name', e.target.value)} />
              </div>

              <Separator className='my-4' />

              <section className="flex justify-around gap-4">
                <div className="flex flex-col items-end gap-2">
                  <Label>Age</Label>
                  <Input
                    className="number-input-sm"
                    value={charInfo.age}
                    type="number"
                    onChange={(e) => handleChange('age', Number(e.target.value))}
                  />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Label>Height</Label>
                  <Input
                    className="number-input-sm"
                    value={charInfo.height}
                    type="number"
                    onChange={(e) => handleChange('height', Number(e.target.value))}
                  />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Label>Weight</Label>
                  <Input
                    className="number-input-sm"
                    value={charInfo.weight}
                    type="number"
                    onChange={(e) => handleChange('weight', Number(e.target.value))}
                  />
                </div>
              </section>

              <Separator className='my-4' />

              <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <Label>Race:</Label>
                  <Input
                    value={charInfo.race}
                    type="text"
                    onChange={(e) => handleChange('race', e.target.value)}
                  ></Input>
                </div>
                <div className='flex flex-col gap-2'>
                  <Label>Antecedent:</Label>
                  <Input
                    value={charInfo.antecedent}
                    type="text"
                    onChange={(e) => handleChange('antecedent', e.target.value)}
                  ></Input>
                </div>
                <div className='flex flex-col gap-2'>
                  <Label>Trend:</Label>
                  <Input
                    value={charInfo.trend}
                    type="text"
                    onChange={(e) => handleChange('trend', e.target.value)}
                  ></Input>
                </div>
              </div>

              <Separator className='my-4' />

              <div className="flex flex-col gap-2">
                <Label>History:</Label>
                <Textarea
                  value={charInfo.history}
                  onChange={(e) => handleChange('history', e.target.value)}
                  className="max-h-40"
                />
              </div>
            </section>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </section>
  );
}
