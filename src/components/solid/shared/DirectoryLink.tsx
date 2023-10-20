export type DirectoryLinkProps = {
  class?: string;
};

const DirectoryLink = (props: DirectoryLinkProps) => {
  return (
    <a
      href="/directory"
      class={`inline-block font-semibold text-black ring-2 ring-black hover:ring-primary hover:ring-offset-2 rounded-full px-4 py-2 bg-primary transition-all duration-200 ${props.class}`}
    >
      Take the First Step
    </a>
  );
};

export default DirectoryLink;
