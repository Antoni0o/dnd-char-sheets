import { useState } from 'react';
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
import type { CharInfo } from '@/models/char-info';
import { useSheetStore } from '@/store/sheet-store';

export function CharInfo() {
  const { sheet, persistSheet } = useSheetStore();
  const [charInfo, setCharInfo] = useState<CharInfo>({
    name: sheet.info.name,
    age: sheet.info.age,
    height: sheet.info.height,
    weight: sheet.info.weight,
    history: sheet.info.history,
  });

  return (
    <section className="mt-4 flex items-center justify-between rounded-lg border-2 p-2">
      <div className="flex gap-4">
        <Label className="text-xl">Name:</Label>
        <span className="h-full max-w-32 truncate text-xl font-bold">{charInfo.name}</span>
      </div>
      <div className="flex items-center">
        <Separator className="mx-2 h-2" orientation="vertical"></Separator>
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
            <div className="flex flex-col gap-2 p-4">
              <Label>Name:</Label>
              <Input
                value={charInfo.name}
                onChange={(e) => setCharInfo({ ...charInfo, name: e.target.value })}
              ></Input>
            </div>
            <section className="flex gap-4 p-4">
              <div className="flex flex-col gap-2">
                <Label>Age:</Label>
                <Input
                  value={charInfo.age}
                  type="number"
                  onChange={(e) => setCharInfo({ ...charInfo, age: Number(e.target.value) })}
                ></Input>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Height:</Label>
                <Input
                  value={charInfo.height}
                  type="number"
                  onChange={(e) => setCharInfo({ ...charInfo, height: Number(e.target.value) })}
                ></Input>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Weight</Label>
                <Input
                  value={charInfo.weight}
                  type="number"
                  onChange={(e) => setCharInfo({ ...charInfo, weight: Number(e.target.value) })}
                ></Input>
              </div>
            </section>
            <div className="flex flex-col gap-2 p-4">
              <Label>History</Label>
              <Textarea
                value={charInfo.history}
                onChange={(e) => setCharInfo({ ...charInfo, history: e.target.value })}
                className="max-h-40"
              ></Textarea>
            </div>
            <DrawerFooter>
              <Button
                onClick={() => {
                  persistSheet({ ...sheet, info: charInfo });
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
      </div>
    </section>
  );
}
