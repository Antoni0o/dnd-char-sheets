'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';
import { toast } from 'sonner';
import { useSheetStore } from '@/store/sheet-store';

export function ClassSelector() {
  const [dndClass, setDnDClass] = useState('');

  const { fetchSpells } = useSheetStore();
  const router = useRouter();

  const createSheet = () => {
    fetchSpells(dndClass);

    if (dndClass) router.push(`/sheet/${dndClass}`);
    else toast.error('Class is not selected!');
  };

  return (
    <section className="flex flex-col gap-4">
      <Label className="text-2xl">Select your class:</Label>
      <Select value={dndClass} onValueChange={setDnDClass}>
        <SelectTrigger className="w-full cursor-pointer">
          <SelectValue placeholder="Class"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem className="cursor-pointer" value="warlock">
            Warlock
          </SelectItem>
        </SelectContent>
      </Select>
      <Button className="cursor-pointer" onClick={() => createSheet()}>
        Create Sheet
      </Button>
    </section>
  );
}
