export type SignOutButtonProps = {
  class?: string;
};

const SignOutButton = (props: SignOutButtonProps) => {
  const handleSignOut = async () => {
    const res = await fetch('/api/auth/signout', { method: 'POST' });
    if (res.redirected) {
      window.location.assign(res.url);
    }
  };

  return (
    <button
      class={`text-primary rounded-md px-4 py-2 duration-200 transition-colors hover:text-primary-light ${props.class}`}
      type="button"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
