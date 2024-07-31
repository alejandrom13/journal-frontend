"use server";
import { cookies } from "next/headers";

const apiUrl = process.env.API_URL;

async function getAllEntries(date: Date) {
  //format date to yyyy-mm-dd
  const formattedDate = date.toISOString().split("T")[0];

  const response = await fetch(apiUrl + "/entry/all/" + formattedDate, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  const data = await response.json();
  console.log(data);
  return data;
}

const createEntry = async ({
  type,
  content,
  createdAt,
}: {
  type: string;
  content: any;
  createdAt: string;
}) => {
  const apiUrl = process.env.API_URL;

  const response = await fetch(apiUrl + "/entry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify({ type: type, content: content, createdAt: createdAt }),
  });
  const data = await response.json();
  return data;
};
export { getAllEntries, createEntry };
