import { ThemeSwitch } from "./commons/theme-switch";

export function NavBar() {
  return (
    <nav className="p-4 flex items-center justify-between border-b-2">
      <h1 className="font-bold text-2xl">DnD Char Sheets</h1>

      <ThemeSwitch></ThemeSwitch>
    </nav>
  );
}