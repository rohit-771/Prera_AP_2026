
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';

/**
 * Admin Login: Authenticate and issue JWT
 */
export const login = async (req, res, next) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    // First: Find admin using exact email
    let admin = await prisma.admin.findUnique({
      where: { email },
    });

    // Second: Gmail dot-insensitive matching
    // Example: teamprera@gmail.com matches team.prera@gmail.com
    if (!admin) {
      const [username, domain] = email.split('@');

      if (
        username &&
        domain &&
        ['gmail.com', 'googlemail.com'].includes(domain)
      ) {
        const gmailAdmins = await prisma.admin.findMany({
          where: {
            email: {
              endsWith: `@${domain}`,
              mode: 'insensitive',
            },
          },
        });

        const matchingAdmins = gmailAdmins.filter((item) => {
          const [savedUsername, savedDomain] = item.email
            .toLowerCase()
            .split('@');

          return (
            savedDomain === domain &&
            savedUsername.replace(/\./g, '') ===
              username.replace(/\./g, '')
          );
        });

        // Only use the match if it is unique
        if (matchingAdmins.length === 1) {
          admin = matchingAdmins[0];
        }
      }
    }

    // Admin not found
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials.',
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials.',
      });
    }

    // Generate JWT
    const secret =
      process.env.JWT_SECRET ||
      'prera_jwt_secret_super_secure_key_2026_AP_project';

    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
      secret,
      { expiresIn }
    );

    return res.status(200).json({
      success: true,
      message: 'Admin authenticated successfully',
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error('ADMIN LOGIN ERROR:', error);
    next(error);
  }
};

/**
 * Admin Profile: Return current admin details
 */
export const getMe = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      data: req.admin,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin Dashboard Overview Metrics
 */
export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalEvents,
      totalApplications,
      pendingEvents,
      pendingApplications,
      approvedEvents,
      approvedApplications,
      underReviewEvents,
      underReviewApplications,
      shortlistedApplications,
      recentEvents,
      recentApplications,
    ] = await Promise.all([
      prisma.eventSubmission.count(),

      prisma.workApplication.count(),

      prisma.eventSubmission.count({
        where: { status: 'Pending' },
      }),

      prisma.workApplication.count({
        where: { status: 'Pending' },
      }),

      prisma.eventSubmission.count({
        where: { status: 'Approved' },
      }),

      prisma.workApplication.count({
        where: { status: 'Approved' },
      }),

      prisma.eventSubmission.count({
        where: { status: 'Under Review' },
      }),

      prisma.workApplication.count({
        where: { status: 'Under Review' },
      }),

      prisma.workApplication.count({
        where: { status: 'Shortlisted' },
      }),

      prisma.eventSubmission.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          referenceId: true,
          eventName: true,
          organizerName: true,
          category: true,
          status: true,
          createdAt: true,
        },
      }),

      prisma.workApplication.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          referenceId: true,
          fullName: true,
          role: true,
          applicationType: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        metrics: {
          totalEvents,
          totalApplications,
          totalCombined: totalEvents + totalApplications,

          pendingTotal: pendingEvents + pendingApplications,
          pendingEvents,
          pendingApplications,

          approvedTotal: approvedEvents + approvedApplications,
          approvedEvents,
          approvedApplications,

          inReviewTotal: underReviewEvents + underReviewApplications,

          shortlistedApplications,
        },

        recentEvents,
        recentApplications,
      },
    });
  } catch (error) {
    console.error('ADMIN DASHBOARD ERROR:', error);
    next(error);
  }
};
