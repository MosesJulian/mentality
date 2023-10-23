import { Show, createSignal, onCleanup, onMount } from 'solid-js';
import DirectoryLink from '../shared/DirectoryLink';
import Wrapper from '../shared/Wrapper';
import SignOutButton from '../shared/SignOutButton';

const SCROLL_THRESHOLD = 30;

export type HeaderProps = {
  userName?: string;
};

const Header = (props: HeaderProps) => {
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

        <Show
          when={props.userName === undefined}
          fallback={
            <div class="flex gap-2 items-center">
              <a
                class="bg-primary text-white rounded-md px-4 py-2 transition-all duration-200 border border-primary hover:text-primary hover:bg-white"
                href="/profile"
              >
                {props.userName}
              </a>

              <SignOutButton />
            </div>
          }
        >
          <nav class="flex items-center justify-around gap-4">
            <DirectoryLink />
          </nav>
        </Show>
      </Wrapper>
    </header>
  );
};

export default Header;
