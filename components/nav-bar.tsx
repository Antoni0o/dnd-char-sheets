'use client';

import { ThemeSwitch } from './commons/theme-switch';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { ClearSheet } from './commons/clear-sheet';

export function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between border-b-2 p-4">
      <h1
        className="text-2xl font-bold"
        onClick={() => {
          router.push('/');
        }}
      >
        Grimora
      </h1>

      <div className="flex items-center gap-4">
        <ThemeSwitch></ThemeSwitch>
        {pathname.includes('/sheet') ? <ClearSheet></ClearSheet> : <></>}
      </div>
    </nav>
  );
}
