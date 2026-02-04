import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export async function transcribeAudio(filePath: string) {
  const form = new FormData();
  form.append("file", fs.createReadStream(filePath));

  const response = await axios.post(
    "http://localhost:8000/transcribe",
    form,
    {
      headers: form.getHeaders(),
    }
  );

  return response.data.text;
}
