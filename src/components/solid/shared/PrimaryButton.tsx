import type { JSX } from 'solid-js';
import clsx from 'clsx';

export type PrimaryButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

const PrimaryButton = ({ class: className, ...props }: PrimaryButtonProps) => {
  console.log(props);

  return (
    <button
      class={clsx([
        'py-2 bg-primary rounded-md text-black font-medium transition-all duration-200 ring-2 ring-black disabled:cursor-not-allowed disabled:ring-slate-700 disabled:bg-slate-700 disabled:text-slate-400 hover:enabled:bg-white hover:enabled:ring-primary-dark hover:enabled:text-primary-dark',
        className,
      ])}
      {...props}
    />
  );
};

export default PrimaryButton;
