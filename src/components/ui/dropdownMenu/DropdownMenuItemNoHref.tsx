'use client';

import { MenuItem } from '@headlessui/react';

interface DropdownMenuItemProps {
  children: React.ReactNode;
}

export default function DropdownMenuItemNoHref({ children }: DropdownMenuItemProps) {
  return (
    <MenuItem>
      <div className='block px-4 py-2 text-sm text-white transition-all duration-200 ease-in-out hover:bg-blue-800/70 hover:text-teal-600 hover:no-underline'>
        {children}
      </div>
    </MenuItem>
  );
}
