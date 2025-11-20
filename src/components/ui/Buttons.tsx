'use client';

import { SignInButton } from '@clerk/clerk-react';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  full?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function EmeraldButton({ children, disabled, full, onClick, type }: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`nice-hover-no-shadow pop inline-flex justify-center rounded-[5px] bg-emerald-500 p-2 font-medium text-black transition-all duration-200 ease-in-out hover:cursor-pointer hover:border-black/30 hover:bg-emerald-700 hover:text-white focus:outline-hidden ${full ? 'w-full' : 'w-fit'}`}
    >
      {children}
    </button>
  );
}

export function RedButton({ children, disabled, full, onClick, type }: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`nice-hover-no-shadow pop inline-flex justify-center ${full ? 'w-full' : 'w-fit'} rounded-[5px] bg-red-500 p-2 font-medium text-black transition-all duration-200 ease-in-out hover:cursor-pointer hover:border-black/30 hover:bg-red-700 hover:text-white focus:outline-hidden`}
    >
      {children}
    </button>
  );
}

export function BlueButton({ children, disabled, full, onClick, type }: Props) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`nice-hover-no-shadow pop inline-flex justify-center ${full ? 'w-full' : 'w-fit'} rounded-[5px] bg-blue-500 p-2 font-medium text-black transition-all duration-200 ease-in-out hover:cursor-pointer hover:border-black/30 hover:bg-blue-700 hover:text-white focus:outline-hidden`}
    >
      {children}
    </button>
  );
}

export function EmeraldSignInButton() {
  return (
    <EmeraldButton type='button'>
      <SignInButton mode='modal'>
        <p className='hover:cursor-pointer'>Create Free Account!</p>
      </SignInButton>
    </EmeraldButton>
  );
}
