import type { JSX } from 'solid-js';

export type WrapperProps = JSX.HTMLAttributes<HTMLDivElement>;

const Wrapper = (props: WrapperProps) => {
  return <div {...props} class={`max-w-[1024px] w-[80vw] mx-auto ${props.class}`} />;
};

export default Wrapper;
