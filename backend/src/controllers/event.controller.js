import prisma from '../config/db.js';
import { generateReferenceId } from '../utils/referenceGenerator.js';

/**
 * Public: Submit a new Event Organizer / Collaboration Proposal
 */
export const createEventSubmission = async (req, res, next) => {
  try {
    const {
      organizerName,
      contactPerson,
      email,
      phone,
      organization,
      eventName,
      category,
      description,
      eventDate,
      location,
      expectedAudience,
      requirements,
      socialLinks,
    } = req.body;

    const referenceId = generateReferenceId('EVT');

    const newEvent = await prisma.eventSubmission.create({
      data: {
        referenceId,
        organizerName,
        contactPerson,
        email,
        phone,
        organization,
        eventName,
        category,
        description,
        eventDate: new Date(eventDate),
        location,
        expectedAudience: String(expectedAudience),
        requirements,
        socialLinks: socialLinks || null,
        status: 'Pending',
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Event proposal submitted successfully. Our team will review and get in touch with you soon!',
      data: {
        id: newEvent.id,
        referenceId: newEvent.referenceId,
        eventName: newEvent.eventName,
        organizerName: newEvent.organizerName,
        status: newEvent.status,
        createdAt: newEvent.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: List all Event Submissions with pagination, search, and filtering
 */
export const getEvents = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const skip = (page - 1) * limit;

    const { search, status, category, startDate, endDate, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const where = {};

    if (status && status !== 'All') {
      where.status = status;
    }

    if (category && category !== 'All') {
      where.category = category;
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }

    if (search && search.trim() !== '') {
      const q = search.trim();
      where.OR = [
        { referenceId: { contains: q, mode: 'insensitive' } },
        { eventName: { contains: q, mode: 'insensitive' } },
        { organizerName: { contains: q, mode: 'insensitive' } },
        { contactPerson: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { organization: { contains: q, mode: 'insensitive' } },
        { location: { contains: q, mode: 'insensitive' } },
      ];
    }

    const validSortFields = ['createdAt', 'eventDate', 'eventName', 'organizerName', 'status'];
    const orderField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const direction = sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc';

    const [total, events] = await Promise.all([
      prisma.eventSubmission.count({ where }),
      prisma.eventSubmission.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderField]: direction },
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: events,
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

/**
 * Admin: Get individual event details
 */
export const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await prisma.eventSubmission.findFirst({
      where: {
        OR: [{ id }, { referenceId: id }],
      },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event submission not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Update Event application status
 */
export const updateEventStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const event = await prisma.eventSubmission.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json({
      success: true,
      message: `Event status updated to '${status}' successfully.`,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Delete event record
 */
export const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.eventSubmission.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: 'Event submission deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
