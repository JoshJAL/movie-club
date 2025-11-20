'use client';

import DropdownMenuItem from '@/components/ui/dropdownMenu/DropdownMenuItem';
import DropdownMenuItemNoHref from '@/components/ui/dropdownMenu/DropdownMenuItemNoHref';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { IoMenu } from 'react-icons/io5';

export default function DropdownMenu() {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <MenuButton
          className={
            'hover:bg-nyanza/50 nice-hover-no-shadow pop inline-flex cursor-pointer justify-center rounded-lg border border-blue-800/30 bg-blue-800/50 p-2 text-sm font-medium text-white transition-all hover:border-black/30 hover:text-teal-600 focus:outline-hidden'
          }
        >
          <IoMenu className='h-6 w-6' />
        </MenuButton>
      </div>
      <MenuItems
        as='div'
        transition
        className='subtle-pop absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-teal-600 overflow-hidden rounded-xl bg-slate-700 ring ring-slate-700/20 backdrop-blur-sm transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-200 data-leave:ease-in'
      >
        <div className='py-1'>
          <DropdownMenuItem href='/'>Home</DropdownMenuItem>
          <DropdownMenuItem href='/clubs'>Clubs</DropdownMenuItem>
          <DropdownMenuItem href='/settings'>Settings</DropdownMenuItem>
        </div>
        <div className='py-1'>
          <SignedIn>
            <DropdownMenuItemNoHref>
              <UserButton />
            </DropdownMenuItemNoHref>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className='hover:bg-nyanza/50 block w-full cursor-pointer px-4 py-2 text-left text-sm text-white transition-all duration-200 ease-in-out hover:text-black hover:no-underline'>
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </MenuItems>
    </Menu>
  );
}
