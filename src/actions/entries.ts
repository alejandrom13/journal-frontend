"use server";
import { cookies } from "next/headers";

const apiUrl = process.env.API_URL;

async function getAllEntries(date: Date) {
  //format date to yyyy-mm-dd
  try {
    const formattedDate = date.toISOString().split("T")[0];

    const response = await fetch(apiUrl + "/entry/all/" + formattedDate, {
      headers: {
        Cookie: cookies().toString(),
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function getAllEntriesByRange({ from, to }: { from: Date; to: Date }) {
  //format date to yyyy-mm-dd
  
  try {
    const fromDate = from.toISOString().split("T")[0];
    const toDate = to.toISOString().split("T")[0];

    console.log(fromDate, toDate);

    const response = await fetch(apiUrl + `/entry/all/${fromDate}/${toDate}`, {
      headers: {
        Cookie: cookies().toString(),
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
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
  try {
    const apiUrl = process.env.API_URL;

    const response = await fetch(apiUrl + "/entry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        type: type,
        content: content,
        createdAt: createdAt,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};

const updateEntry = async ({
  id,
  type,
  content,
  updatedAt,
}: {
  id: string;
  type: string;
  content: any;
  updatedAt: string;
}) => {
  try {
    const apiUrl = process.env.API_URL;

    const response = await fetch(apiUrl + "/entry/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        type: type,
        content: content,
        updatedAt: updatedAt,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const deleteEntry = async (id: string) => {
  try {
    const apiUrl = process.env.API_URL;

    const response = await fetch(apiUrl + "/entry/" + id, {
      method: "DELETE",
      headers: {
        Cookie: cookies().toString(),
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};
export {
  getAllEntries,
  createEntry,
  deleteEntry,
  updateEntry,
  getAllEntriesByRange,
};
