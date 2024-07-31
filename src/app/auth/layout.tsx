import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

const AuthLayout = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton 
        fallbackRedirectUrl={"/home"}
        ></SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton></UserButton>
      </SignedIn>
    </div>
  );
};

export default AuthLayout;
