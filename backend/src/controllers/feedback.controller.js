
import prisma from '../config/db.js';

// Public: Submit feedback
export const createFeedback = async (req, res, next) => {
  try {
    const { name, email, rating, message } = req.body;

    const feedback = await prisma.feedback.create({
      data: {
        name,
        email,
        rating: Number(rating),
        message,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully. Thank you!',
      data: {
        id: feedback.id,
        name: feedback.name,
        rating: feedback.rating,
        status: feedback.status,
        createdAt: feedback.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all feedback with pagination and search
export const getFeedback = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const skip = (page - 1) * limit;
    const { search, status } = req.query;

    const where = {};

    if (status && status !== 'All') {
      where.status = status;
    }

    if (search && search.trim()) {
      const q = search.trim();
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { message: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [total, feedback] = await Promise.all([
      prisma.feedback.count({ where }),
      prisma.feedback.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: feedback,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get one feedback record
export const getFeedbackById = async (req, res, next) => {
  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id: req.params.id },
    });

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Update feedback status
export const updateFeedbackStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const feedback = await prisma.feedback.update({
      where: { id: req.params.id },
      data: { status },
    });

    return res.status(200).json({
      success: true,
      message: `Feedback status updated to '${status}' successfully.`,
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Delete feedback
export const deleteFeedback = async (req, res, next) => {
  try {
    await prisma.feedback.delete({
      where: { id: req.params.id },
    });

    return res.status(200).json({
      success: true,
      message: 'Feedback deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
