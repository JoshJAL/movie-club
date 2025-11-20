import DropdownMenu from '@/components/ui/dropdownMenu/DropdownMenu';
import Link from 'next/link';

import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'] });

export default function Header() {
  return (
    <header className='fixed top-0 z-50 w-full p-2'>
      <nav className='pop mx-auto flex w-full max-w-7xl items-center gap-5 rounded-lg border border-slate-700/30 bg-slate-700/50 p-3 backdrop-blur-sm'>
        <Link
          prefetch
          href='/'
          className={`text-xl text-white transition-all duration-200 ease-in-out hover:scale-105 md:text-2xl ${roboto.className}`}
        >
          Movie Club
        </Link>
        <div className='flex-1' />
        <DropdownMenu />
      </nav>
    </header>
  );
}
