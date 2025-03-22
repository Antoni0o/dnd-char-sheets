'use client';

import { CharInfo } from '@/components/char-info';
import { CharSpecs } from '@/components/char-specs';
import { CharSpells } from '@/components/char-spells';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'next/navigation';

export default function Class() {
  const params = useParams();
  const dndClass = params.class;

  return (
    <main className="flex flex-col gap-4">
      <header>
        <h1 className="text-3xl font-bold capitalize">Class: {dndClass}</h1>
        <CharInfo></CharInfo>
      </header>
      <Separator></Separator>
      <section className="flex flex-col gap-4">
        <CharSpecs></CharSpecs>
        <CharSpells></CharSpells>
      </section>
    </main>
  );
}
