"use server";

import { clerkClient } from "@clerk/nextjs/server";

async function updateTheme(data: any) {
  const clerk = clerkClient();
  const response = await clerk.users.updateUserMetadata(data?.userId, {
    publicMetadata: {
      theme: data?.theme,
    },
  });

  return JSON.stringify(response);
}

async function finishOnboarding(data: any) {
  const clerk = clerkClient();
  const response = await clerk.users.updateUserMetadata(data?.userId, {
    publicMetadata: {
      onboardingCompleted: true,
    },
  });

  return JSON.stringify(response);
}

export { updateTheme, finishOnboarding };
