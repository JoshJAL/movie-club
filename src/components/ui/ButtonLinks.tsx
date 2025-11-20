import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  full?: boolean;
  onClick?: () => void;
  href: string;
  prefetch?: boolean | null;
  target?: '_self' | '_blank' | '_parent' | '_top';
}

export function EmeraldButtonLink({ children, full, onClick, href, prefetch = true, target }: Props) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      target={target}
      onClick={onClick}
      className={`nice-hover-no-shadow pop justify-center inline-flex ${full ? 'w-full' : 'w-fit'} rounded-[5px] bg-emerald-500 p-2 text-center font-medium text-black transition-all duration-200 ease-in-out hover:cursor-pointer hover:border-black/30 hover:bg-emerald-700 hover:text-white focus:outline-hidden`}
    >
      {children}
    </Link>
  );
}

export function RedButtonLink({ children, full, onClick, href, prefetch = true, target }: Props) {
  return (
    <Link
      onClick={onClick}
      href={href}
      prefetch={prefetch}
      target={target}
      className={`nice-hover-no-shadow pop justify-center inline-flex ${full ? 'w-full' : 'w-fit'} rounded-[5px] bg-red-500 p-2 text-center font-medium text-black transition-all duration-200 ease-in-out hover:cursor-pointer hover:border-black/30 hover:bg-red-700 hover:text-white focus:outline-hidden`}
    >
      {children}
    </Link>
  );
}

export function BlueButtonLink({ children, full, onClick, href, prefetch = true, target }: Props) {
  return (
    <Link
      onClick={onClick}
      href={href}
      prefetch={prefetch}
      target={target}
      className={`nice-hover-no-shadow pop justify-center inline-flex ${full ? 'w-full' : 'w-fit'} rounded-[5px] bg-blue-500 p-2 text-center font-medium text-black transition-all duration-200 ease-in-out hover:cursor-pointer hover:border-black/30 hover:bg-blue-700 hover:text-white focus:outline-hidden`}
    >
      {children}
    </Link>
  );
}
