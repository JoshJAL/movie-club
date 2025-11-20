import { FieldErrors } from './FieldErrors';

import { useFieldContext } from '.';

interface Props {
  label: string;
  required?: boolean;
}

export function Checkbox({ label, required = false }: Props) {
  const field = useFieldContext<boolean>();

  return (
    <div className='relative flex items-start'>
      <div className='flex h-6 items-center'>
        <input
          required={required}
          onChange={(e) => field.handleChange(e.target.checked)}
          checked={field.state.value}
          id={field.name}
          name={field.name}
          type='checkbox'
          onBlur={field.handleBlur}
          className='h-4 w-4 cursor-pointer rounded-sm border-0 ring-blue-800 transition-all duration-200 ease-in-out focus:shadow-[2px_2px_0px_rgba(0,0,1,1)] focus:ring-teal-600 focus:outline-hidden'
        />
      </div>
      <div className='ml-3 leading-6'>
        <label htmlFor={field.name} className='font-medium'>
          {label}
        </label>
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
}
