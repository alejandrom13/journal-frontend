"use client";

import { SignIn, SignUp, useUser } from "@clerk/nextjs";

const ClerkSignUp = () => {
  const { user } = useUser();
  return <div>{!user ? <SignUp fallbackRedirectUrl={'/home'} /> : null}</div>;
};
export default ClerkSignUp;
