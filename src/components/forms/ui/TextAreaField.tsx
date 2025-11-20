import { FieldErrors } from '@/components/forms/ui/FieldErrors';

import { useFieldContext } from '@/components/forms/ui';

interface Props {
  autoFocus?: boolean;
  label: string;
  noLabel?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  value?: string;
}

export function TextAreaField({ autoFocus, label, noLabel, onChange, placeholder, required = true, value }: Props) {
  const field = useFieldContext<string>();

  return (
    <div>
      <label htmlFor={field.name} className={`block leading-6 font-medium ${noLabel ? 'sr-only' : ''}`}>
        {label}
      </label>
      <div className='mt-2'>
        <textarea
          autoFocus={autoFocus}
          required={required}
          value={value ? value : field.state.value}
          onChange={onChange ? onChange : (e) => field.handleChange(e.target.value)}
          name={field.name}
          id={field.name}
          className='pop nice-focus-no-shadow block w-full rounded-lg border-0 bg-white/85 px-3 py-2 text-black ring ring-white/20 backdrop-blur-sm transition-all duration-300 ease-in-out outline-none placeholder:text-gray-500 focus:shadow-[3px_3px_0px_rgba(0,0,0,1)]'
          placeholder={placeholder}
        />
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
}
