'use client';

import { ClassSelector } from '@/components/class-selector';
import { useSheetStore } from '@/src/store/sheet-store';
import React, { useEffect } from 'react';

export default function Home() {
  const { getSheet } = useSheetStore();

  useEffect(() => {
    getSheet();
  }, []);

  return (
    <main className="flex h-80 flex-col items-center justify-center">
      <ClassSelector></ClassSelector>
    </main>
  );
}
