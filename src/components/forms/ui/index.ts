import { Checkbox } from './Checkbox';
import { SelectField } from './SelectField';
import { SubmitButton } from './SubmitButton';
import { TextAreaField } from './TextAreaField';
import { TextField } from './TextField';

import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

export const { fieldContext, useFieldContext, formContext, useFormContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    Checkbox,
    SelectField,
    TextAreaField,
    TextField
  },
  formComponents: {
    SubmitButton
  },
  fieldContext,
  formContext
});
