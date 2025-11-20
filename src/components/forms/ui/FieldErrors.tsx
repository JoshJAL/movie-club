import { AnyFieldMeta } from '@tanstack/react-form';
import { ZodError } from 'zod';

interface Props {
  meta: AnyFieldMeta;
}

export function FieldErrors({ meta }: Props) {
  if (!meta.isTouched) return null;

  return meta.errors.map(({ message }: ZodError, index) => (
    <p key={index} className='mt-2 text-sm font-medium text-red-600 italic'>
      {message}
    </p>
  ));
}
