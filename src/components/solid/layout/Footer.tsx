import Wrapper from '../shared/Wrapper';

export type FooterProps = {
  currentYear: number;
  class?: string;
};

const Footer = (props: FooterProps) => {
  return (
    <Wrapper>
      <footer class={`text-center text-slate-600 text-lg ${props.class}`}>
        <small>&copy; {props.currentYear} Mentality</small>
      </footer>
    </Wrapper>
  );
};

export default Footer;
