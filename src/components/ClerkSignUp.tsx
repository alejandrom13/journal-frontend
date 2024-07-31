"use client";

import { SignIn, SignUp, useUser } from "@clerk/nextjs";

const ClerkSignUp = () => {
  const { user } = useUser();
  return <div>{!user ? <SignUp fallbackRedirectUrl={'/onboarding'} /> : null}</div>;
};
export default ClerkSignUp;
