'use client';

import { ClassSelector } from '@/components/class-selector';
import { useSheetStore } from '@/store/sheet-store';
import { useEffect } from 'react';

export default function Home() {
  const { fetchSheet } = useSheetStore();

  useEffect(() => {
    fetchSheet();
  }, []);

  return (
    <main className="flex h-80 flex-col items-center justify-center">
      <ClassSelector></ClassSelector>
    </main>
  );
}
