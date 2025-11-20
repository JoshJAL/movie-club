import Link from 'next/link';

import { MenuItem } from '@headlessui/react';

interface DropdownMenuItemProps {
  children: React.ReactNode;
  href: string;
  prefetch?: boolean;
  target?: '_self' | '_blank' | '_parent' | '_top';
}

export default function DropdownMenuItem({ children, href, prefetch = true, target = '_self' }: DropdownMenuItemProps) {
  return (
    <MenuItem as='div'>
      <Link
        prefetch={prefetch}
        target={target}
        href={href}
        className='block px-4 py-2 text-sm text-white transition-all duration-200 ease-in-out hover:bg-blue-800/70 hover:text-teal-600 hover:no-underline'
      >
        {children}
      </Link>
    </MenuItem>
  );
}
