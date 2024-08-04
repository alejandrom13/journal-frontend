"use server";

import { clerkClient } from "@clerk/nextjs/server";

const updateTheme = async (userId: string, theme: string) => {
  const response = await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      theme: theme,
    },
  });

  return response;
};

export { updateTheme };
