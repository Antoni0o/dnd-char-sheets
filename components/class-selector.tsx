'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';
import { toast } from 'sonner';
import { baseClasses } from '@/store/baseValues/baseClasses';
import { useClassStore } from '@/store/class-store';

export function ClassSelector() {
  const [dndClass, setDnDClass] = useState('');
  const { setCharClass } = useClassStore();

  const router = useRouter();

  const createSheet = () => {
    if (dndClass) {
      const selectedClass = baseClasses.find((cls) => cls.name === dndClass);
      if (selectedClass) {
        setCharClass(dndClass);
        router.push(`/sheet/${dndClass}`);
      }
    } else toast.error('Class is not selected!');
  };

  return (
    <section className="flex flex-col gap-4">
      <Label className="text-2xl">Select your class:</Label>
      <Select value={dndClass} onValueChange={setDnDClass}>
        <SelectTrigger className="w-full cursor-pointer">
          <SelectValue placeholder="Class"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {baseClasses.map((charClass) => {
            return (
              <SelectItem
                className="cursor-pointer capitalize"
                key={charClass.name}
                value={charClass.name}
              >
                {charClass.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Button className="cursor-pointer" onClick={() => createSheet()}>
        Create Sheet
      </Button>
    </section>
  );
}
