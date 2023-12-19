'use client';
import { SunIcon } from '@/icons/SunIcon';
import { MoonIcon } from '@/icons/MoonIcon';
import { Switch } from '@nextui-org/react';
import { Dispatch, SetStateAction } from 'react';

interface DarkModeSwitchProps {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

export default function DarkModeSwitch({
  darkMode,
  setDarkMode
}: DarkModeSwitchProps) {
  return (
    <Switch
      isSelected={darkMode}
      onChange={() => setDarkMode(cur => !cur)}
      size="lg"
      color="secondary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <MoonIcon className={className} />
        ) : (
          <SunIcon className={className} />
        )
      }
    ></Switch>
  );
}
