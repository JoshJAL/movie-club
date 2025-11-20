import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'] });

interface Props {
  children: React.ReactNode;
  label: number | string;
}

export default function Info({ children, label }: Props) {
  return (
    <div className='grid gap-3'>
      <p className={`font-bold ${roboto.className}`}>{label}</p>
      {children}
    </div>
  );
}
