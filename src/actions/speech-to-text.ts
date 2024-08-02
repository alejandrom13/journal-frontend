"use server";

export async function getTranscript(filePath: string): Promise<any> {

  
  const form = new FormData();

  form.append("model", "whisper-1");

  try {
    // Fetch the file from the URL
    const fileResponse = await fetch(filePath);
    if (!fileResponse.ok) {
      throw new Error(`Failed to fetch the file: ${fileResponse.status}`);
    }

    const fileBlob = await fileResponse.blob();
    form.append("file", fileBlob, "audio.wav"); // "audio.wav" is a default filename

    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Include this header if needed
        },
        body: form,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error uploading audio:", error);
  }
}
