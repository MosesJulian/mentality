import type { JSX } from 'solid-js';

export type PrimaryButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <button
      {...props}
      class={`
        px-6 py-2 bg-primary rounded-md text-white transition-all duration-200 ring-2 ring-black
        disabled:cursor-not-allowed disabled:ring-slate-700 disabled:bg-slate-700 disabled:text-slate-400
        hover:enabled:bg-white hover:enabled:ring-primary hover:enabled:text-primary
        ${props.class}
      `}
    />
  );
};

export default PrimaryButton;
