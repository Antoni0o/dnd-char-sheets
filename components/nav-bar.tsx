'use client';

import { ThemeSwitch } from './commons/theme-switch';
import { useRouter } from 'next/navigation';

export function NavBar() {
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
      </div>
    </nav>
  );
}
