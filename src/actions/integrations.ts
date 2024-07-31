"use server";
import { cookies } from "next/headers";

const apiUrl = process.env.API_URL;

async function createIntegration(type: string, metadata: any) {
  const response = await fetch(apiUrl + "/integrations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      Cookie: cookies().toString(),
    },
    body: JSON.stringify({ type: type, metadata: metadata }),
  });

  const data = await response.json();

  return data;
}

async function getAllIntegrations() {
  const response = await fetch(apiUrl + "/integrations/all", {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  const data = await response.json();

  return data;
}

async function deleteIntegration(id: string) {
  const response = await fetch(apiUrl + "/integrations/" + id, {
    method: "DELETE",
    headers: {
      Cookie: cookies().toString(),
    },
  });

  const data = await response.json();

  return data;
}

export { createIntegration, getAllIntegrations, deleteIntegration };
