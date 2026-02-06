import { Request, Response } from "express";
import { prisma } from "../config/prisma";

/**
 * GET /admin/users?page=&limit=
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 20, 100);

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { created_at: "desc" },
        select: {
          id: true,
          email: true,
          status: true,
          created_at: true,
        },
      }),
      prisma.user.count(),
    ]);

    res.status(200).json({
      success: true,
      data: users,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * PUT /admin/users/:id
 * Update user details (role, name, etc.)
 */
export const updateUserByAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const user = await prisma.user.update({
      where: { id },
      data: payload,
    });

    res.status(200).json({
      success: true,
      message: "User updated",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * DELETE /admin/users/:id/status
 * Soft deactivate / active user
 */
export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        status: status,
      },
    });

    res.status(200).json({
      success: true,
      message: "User status updated",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
