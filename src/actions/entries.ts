"use server";
import { cookies } from "next/headers";

async function getAllEntries(date: Date) {
  const apiUrl = process.env.API_URL;
  //format date to yyyy-mm-dd
  const formattedDate = date.toISOString().split("T")[0];

  const response = await fetch(apiUrl + "/entry/all/" + formattedDate, {
    headers: {
      Cookie: cookies().toString(),
    },
  });


  const data = await response.json();

  console.log("data", data);
  return data;
}

const createEntry = async ({
  type,
  content,
}: {
  type: string;
  content: any;
}) => {
  const apiUrl = process.env.API_URL;

  console.log("Creating entry", type, content);

  const response = await fetch(apiUrl + "/entry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      Cookie: cookies().toString(),
    },
    body: JSON.stringify({ type: type, content: content }),
  });
  const data = await response.json();
  return data;
};
export { getAllEntries, createEntry };
