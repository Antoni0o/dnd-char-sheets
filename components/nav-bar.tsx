'use client';

import { ThemeSwitch } from './commons/theme-switch';
import { usePathname } from 'next/navigation';
import React from 'react';
import { ClearSheet } from './commons/clear-sheet';
import Link from 'next/link';
import Image from 'next/image';

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between border-b-2 px-4 py-2">
      <Link className="flex items-center gap-2 text-2xl font-bold" href="/">
        <Image
          src="/grimora-logo-branco.png"
          width={48}
          height={48}
          alt="Logo Grimora"
          className="rounded-lg"
        ></Image>
        Grimora
      </Link>

      <div className="flex items-center gap-4">
        <ThemeSwitch></ThemeSwitch>
        {pathname.includes('/sheet') ? <ClearSheet></ClearSheet> : <></>}
      </div>
    </nav>
  );
}
