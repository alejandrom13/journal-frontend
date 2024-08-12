"use server";

import { cookies } from "next/headers";

const createEvent = async ({
  type,
  content,
  createdAt,
}: {
  type: string;
  content: any;
  createdAt: string;
}) => {
  console.log("Creating event");
  try {
    const apiUrl = process.env.API_URL;

    const response = await fetch(apiUrl + "/entry/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        sendNotifications: true,
        body: {
          end: {
            dateTime: "2024-08-11T04:00:00.000Z",
          },
          start: {
            dateTime: "2024-08-11T04:00:00.000Z",
          },
          summary: "Meeting with Juan Perez",
          description: "Testing",
        },
      }),
    });

   
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};

const deleteEvent = async (id: string) => {
  console.log("Deleting event", id);
  try {
    const apiUrl = process.env.API_URL;

    const response = await fetch(apiUrl + "/entry/event/" + id, {
      method: "DELETE",
      headers: {
        Cookie: cookies().toString(),
      },
    });
    // const data = await response.json();
    if(response.status === 200){
      return id;
    }
    
  } catch (error) {
    console.log("PASANDO AL CATCH")
    console.error("Error:", error);
    return error;
  }
};

export { createEvent, deleteEvent};
