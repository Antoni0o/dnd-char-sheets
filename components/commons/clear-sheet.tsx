import { Trash } from 'lucide-react';
import { Button } from '../ui/button';
import React from 'react';
import { useSheetStore } from '@/src/store/sheet-store';

export function ClearSheet() {
  const { clearSheet } = useSheetStore();

  return (
    <Button variant="destructive" size="icon" onClick={() => clearSheet()}>
      <Trash />
    </Button>
  );
}
