'use client';

import { Save } from 'lucide-react';
import { ThemeSwitch } from './commons/theme-switch';
import { Button } from './ui/button';
import { useSheetStore } from '@/store/sheet-store';
import { useRouter } from 'next/navigation';

export function NavBar() {
  const { sheet, persistSheet } = useSheetStore();
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between border-b-2 p-4">
      <h1
        className="text-2xl font-bold"
        onClick={() => {
          router.push('/');
        }}
      >
        DnD Char Sheets
      </h1>

      <div className="flex gap-4">
        <ThemeSwitch></ThemeSwitch>
        <Button
          onClick={() => {
            persistSheet(sheet);
          }}
        >
          <Save />
        </Button>
      </div>
    </nav>
  );
}
