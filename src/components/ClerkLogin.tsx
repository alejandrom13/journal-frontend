"use client";

import { SignIn, useUser } from "@clerk/nextjs";

const ClerkLogin = () => {
  const { user } = useUser();
  return <div>{!user ? <SignIn fallbackRedirectUrl={'/home'} /> : null}</div>;
};
export default ClerkLogin;
