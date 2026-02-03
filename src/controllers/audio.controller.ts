import { Request, Response } from "express";
import { transcribeAudio } from "../services/transcription.service";

export async function uploadAudio(req: Request, res: Response) {
  try {
    const file = (req as any).file;

    if (!file) {
      return res.status(400).json({ error: "Audio file required" });
    }

    const transcript = await transcribeAudio(file.path);

    res.json({ transcript });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
