'use client';

import { Info } from '@/components/char/info';
import { Specs } from '@/components/char/specs/specs';
import { Spells } from '@/components/char/spells/spells';
import { Loading } from '@/components/commons/loading';
import { Separator } from '@/components/ui/separator';
import CharClass from '@/src/models/char-class';
import { useClassStore } from '@/src/store/class-store';
import React, { useEffect, useState } from 'react';

export default function Class() {
  const { charClass: storeCharClass } = useClassStore();
  const [charClass, setCharClass] = useState<CharClass>({} as CharClass);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCharClass(storeCharClass!);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [storeCharClass]);

  return (
    <>
      {!isLoading ? (
        <main className="flex flex-col gap-4">
          <header>
            <h1 className="text-3xl font-bold capitalize">Class: {charClass.name}</h1>
            <Info></Info>
          </header>
          <Separator></Separator>
          <section className="flex flex-col gap-4">
            <Specs></Specs>
            {charClass.canUseSpells && <Spells charClass={charClass.name}></Spells>}
          </section>
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}
