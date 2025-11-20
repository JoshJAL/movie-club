import { FieldErrors } from './FieldErrors';

import { useFieldContext } from '.';

interface Props {
  children: React.ReactNode;
  label: string;
  required?: boolean;
}

export function SelectField({ children, label, required = true }: Props) {
  const field = useFieldContext<string>();

  return (
    <div>
      <label htmlFor={field.name} className='block leading-6 font-medium'>
        {label}
      </label>
      <div className='mt-2'>
        <select
          required={required}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          name={field.name}
          id={field.name}
          className='pop nice-focus-no-shadow block w-full cursor-pointer rounded-lg border-0 bg-white/85 px-3 py-2 text-black ring ring-white/20 backdrop-blur-sm transition-all duration-300 ease-in-out outline-none focus:shadow-[3px_3px_0px_rgba(0,0,0,1)]'
        >
          {children}
        </select>
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
}
