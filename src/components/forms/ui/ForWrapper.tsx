interface Props {
  children: React.ReactNode;
  handleSubmit: () => void;
}

export default function FormWrapper({ children, handleSubmit }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className='flex flex-col gap-3'
    >
      {children}
    </form>
  );
}
