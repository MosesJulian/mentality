import { createSignal, onCleanup, onMount } from 'solid-js';
import DirectoryLink from '../shared/DirectoryLink';
import Wrapper from '../shared/Wrapper';

const SCROLL_THRESHOLD = 30;

const Header = () => {
  const [hasScrolled, setHasScrolled] = createSignal(false);

  const handleScroll = () => {
    setHasScrolled(window.scrollY > SCROLL_THRESHOLD);
  };

  onMount(() => {
    window.addEventListener('scroll', handleScroll);

    onCleanup(() => {
      window.removeEventListener('scroll', handleScroll);
    });
  });

  return (
    <header
      class="sticky top-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-md z-10 transition-all duration-200"
      classList={{
        'shadow-md': hasScrolled(),
      }}
    >
      <Wrapper class="flex items-center justify-between gap-8 py-6">
        <a href="/">
          <h1 class="text-2xl font-semibold">Mentality</h1>
        </a>

        <nav class="flex items-center justify-around gap-4">
          <DirectoryLink />
        </nav>
      </Wrapper>
    </header>
  );
};

export default Header;
