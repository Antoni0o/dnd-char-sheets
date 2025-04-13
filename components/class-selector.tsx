'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { baseClasses } from '@/src/store/baseValues/baseClasses';
import { useClassStore } from '@/src/store/class-store';

export function ClassSelector() {
  const [dndClass, setDnDClass] = useState('');
  const { setCharClass } = useClassStore();

  const router = useRouter();

  const createSheet = () => {
    if (!dndClass) {
      toast.error('Class is not selected!');
      return;
    }

    const selectedClass = baseClasses.find((cls) => cls.name === dndClass);
    if (selectedClass) {
      setCharClass(dndClass);
      router.push(`/sheet/${dndClass}`);
    }
  };

  function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

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
              <SelectItem className="cursor-pointer" key={charClass.name} value={charClass.name}>
                {capitalize(charClass.name)}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Button aria-label="Create character sheet" onClick={() => createSheet()}>
        Create Sheet
      </Button>
    </section>
  );
}
