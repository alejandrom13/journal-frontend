"use server";

import { clerkClient } from "@clerk/nextjs/server";

async function updateTheme(data:any) {
  console.log("data", data);
  console.log("userId", data?.userId);
  console.log("theme", data?.theme);
  const clerk = clerkClient();
  const response = await clerk.users.updateUserMetadata(data?.userId, {
    publicMetadata: {
      theme: data?.theme,
    },
  });

  if (response.publicMetadata) {
    console.log("response.publicMetadata", response.publicMetadata);
  }

  console.log("response", response);
  return JSON.stringify(response);
}

export { updateTheme };
