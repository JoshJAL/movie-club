import { EmeraldButton } from '@/components/ui/Buttons';

import { useStore } from '@tanstack/react-form';
import { useFormContext } from '.';

interface Props {
  text?: string;
  submittingText?: string;
}

export function SubmitButton({ text = 'Submit', submittingText = 'Submitting...' }: Props) {
  const form = useFormContext();

  const [isSubmitting, canSubmit] = useStore(form.store, (state) => [state.isSubmitting, state.canSubmit]);

  return (
    <EmeraldButton full type='submit' disabled={isSubmitting || !canSubmit}>
      {isSubmitting ? submittingText : text}
    </EmeraldButton>
  );
}
