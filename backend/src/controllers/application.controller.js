import prisma from '../config/db.js';
import { generateReferenceId } from '../utils/referenceGenerator.js';

/**
 * Public: Submit a new Join PRERA / Work Application
 */
export const createApplication = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      institution,
      studyYear,
      role,
      applicationType,
      skills,
      experience,
      motivation,
      linkedinUrl,
      portfolioUrl,
      resumeUrl,
    } = req.body;

    const referenceId = generateReferenceId('APP');

    const newApplication = await prisma.workApplication.create({
      data: {
        referenceId,
        fullName,
        email,
        phone,
        institution,
        studyYear: studyYear || null,
        role,
        applicationType,
        skills,
        experience: experience || null,
        motivation,
        linkedinUrl: linkedinUrl || null,
        portfolioUrl: portfolioUrl || null,
        resumeUrl: resumeUrl || null,
        status: 'Pending',
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully. We are excited to review your profile and reach out!',
      data: {
        id: newApplication.id,
        referenceId: newApplication.referenceId,
        fullName: newApplication.fullName,
        role: newApplication.role,
        applicationType: newApplication.applicationType,
        status: newApplication.status,
        createdAt: newApplication.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: List all Work Applications with pagination, search, and filtering
 */
export const getApplications = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const skip = (page - 1) * limit;

    const {
      search,
      status,
      role,
      applicationType,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const where = {};

    if (status && status !== 'All') {
      where.status = status;
    }

    if (role && role !== 'All') {
      where.role = role;
    }

    if (applicationType && applicationType !== 'All') {
      where.applicationType = applicationType;
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
        { fullName: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { phone: { contains: q, mode: 'insensitive' } },
        { institution: { contains: q, mode: 'insensitive' } },
        { role: { contains: q, mode: 'insensitive' } },
        { skills: { contains: q, mode: 'insensitive' } },
      ];
    }

    const validSortFields = ['createdAt', 'fullName', 'role', 'status', 'applicationType'];
    const orderField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const direction = sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc';

    const [total, applications] = await Promise.all([
      prisma.workApplication.count({ where }),
      prisma.workApplication.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderField]: direction },
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: applications,
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
 * Admin: Get individual application details
 */
export const getApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const application = await prisma.workApplication.findFirst({
      where: {
        OR: [{ id }, { referenceId: id }],
      },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Work application not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Update applicant status
 */
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await prisma.workApplication.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json({
      success: true,
      message: `Applicant status updated to '${status}' successfully.`,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Delete application record
 */
export const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.workApplication.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: 'Work application deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
