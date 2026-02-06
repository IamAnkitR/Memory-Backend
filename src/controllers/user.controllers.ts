import { Request, Response } from "express";
import { prisma } from "../config/prisma";

/**
 * GET /users/me
 */
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        status: true,
        created_at: true,
      },
    });

    res.json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * PUT /users/me
 */
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { userId, email } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { email },
      select: {
        id: true,
        email: true,
        updatedAt: true,
      },
    });

    res.json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * DELETE /users/me
 * Soft delete
 */
export const deleteUserAccount = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    await prisma.user.update({
      where: { id: userId },
      data: { status: "INACTIVE" },
    });

    res.json({ success: true, message: "Account deactivated" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /users/settings
 */
export const getUserSettings = async (req: Request, res: Response) => {
  try {
    const userId = req.body;

    const settings = await prisma.userSettings.findUnique({
      where: { userId },
    });

    res.json({ success: true, data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * PUT /users/settings
 */
export const updateUserSettings = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const settings = await prisma.userSettings.upsert({
      where: { id },
      update: req.body,
      create: {
        id,
        ...req.body,
      },
    });

    res.json({ success: true, data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /users/audios
 */
export const getUserAudios = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const audios = await prisma.audio_Records.findMany({
      where: { id: userId },
      orderBy: { created_at: "desc" },
    });

    res.json({ success: true, data: audios });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /users/audios/:id
 */
export const getUserAudioById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User Id",
      });
    }

    const audio = await prisma.audio_Records.findFirst({
      where: { id },
    });

    if (!audio) {
      return res
        .status(404)
        .json({ success: false, message: "Audio not found" });
    }

    res.json({ success: true, data: audio });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * DELETE /users/audios/:id
 */
export const deleteUserAudio = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User Id",
      });
    }

    await prisma.audio_Records.deleteMany({
      where: { id },
    });

    res.json({ success: true, message: "Audio deleted" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /users/activity
 */
export const getUserActivity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User Id",
      });
    }

    const activity = await prisma.activity.findMany({
      where: { id },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    res.json({ success: true, data: activity });
  } catch (error: any) {
    res.json({
      success: false,
    });
  }
};
