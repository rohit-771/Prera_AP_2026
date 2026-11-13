import { body, validationResult } from 'express-validator';

// Helper to check validation results and respond with error details
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please correct the highlighted errors.',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

export const eventSubmissionValidationRules = [
  body('organizerName')
    .trim()
    .notEmpty()
    .withMessage('Organizer or Organization Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Organizer name must be between 2 and 100 characters'),

  body('contactPerson')
    .trim()
    .notEmpty()
    .withMessage('Contact Person Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Contact person must be between 2 and 100 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Official Email Address is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone Number is required')
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/)
    .withMessage('Please provide a valid phone number (at least 7 digits)'),

  body('organization')
    .trim()
    .notEmpty()
    .withMessage('College / University / Company Name is required'),

  body('eventName')
    .trim()
    .notEmpty()
    .withMessage('Event Name is required')
    .isLength({ min: 2, max: 150 })
    .withMessage('Event name must be between 2 and 150 characters'),

  body('category')
    .trim()
    .notEmpty()
    .withMessage('Event Category is required')
    .isIn(['Technical', 'Cultural', 'Sports', 'Business', 'Educational', 'Other'])
    .withMessage('Category must be one of: Technical, Cultural, Sports, Business, Educational, Other'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Event Description is required')
    .isLength({ min: 10, max: 3000 })
    .withMessage('Event description should be between 10 and 3000 characters'),

  body('eventDate')
    .notEmpty()
    .withMessage('Event Date is required')
    .custom((val) => {
      const parsedDate = new Date(val);
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Please provide a valid event date');
      }
      return true;
    }),

  body('location')
    .trim()
    .notEmpty()
    .withMessage('Event Location is required'),

  body('expectedAudience')
    .trim()
    .notEmpty()
    .withMessage('Expected Audience / Footfall is required'),

  body('requirements')
    .trim()
    .notEmpty()
    .withMessage('Sponsorship or Collaboration Requirements are required')
    .isLength({ min: 5, max: 3000 })
    .withMessage('Requirements should be between 5 and 3000 characters'),

  body('socialLinks')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 500 })
    .withMessage('Social links URL too long'),
];

export const workApplicationValidationRules = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email Address is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone Number is required')
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/)
    .withMessage('Please provide a valid phone number (at least 7 digits)'),

  body('institution')
    .trim()
    .notEmpty()
    .withMessage('College / University / Organization is required'),

  body('studyYear')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 50 }),

  body('role')
    .trim()
    .notEmpty()
    .withMessage('Role Applying For is required')
    .isIn([
      'Business Development',
      'Marketing',
      'Event Management',
      'Sponsorship & Partnerships',
      'Social Media Management',
      'Graphic Design',
      'Content Writing',
      'Web Development',
      'Operations',
      'Volunteer',
      'Other',
    ])
    .withMessage('Please select a valid role from the list'),

  body('applicationType')
    .trim()
    .notEmpty()
    .withMessage('Application Type is required')
    .isIn(['Internship', 'Part-time', 'Full-time', 'Volunteer', 'Freelance'])
    .withMessage('Please select a valid application type'),

  body('skills')
    .trim()
    .notEmpty()
    .withMessage('Skills are required')
    .isLength({ min: 2, max: 2000 })
    .withMessage('Skills description must be between 2 and 2000 characters'),

  body('experience')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 3000 }),

  body('motivation')
    .trim()
    .notEmpty()
    .withMessage('Please explain why you want to join PRERA')
    .isLength({ min: 10, max: 3000 })
    .withMessage('Motivation must be between 10 and 3000 characters'),

  body('linkedinUrl')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 300 }),

  body('portfolioUrl')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 300 }),

  body('resumeUrl')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 300 }),
];

export const adminLoginValidationRules = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Admin email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const statusUpdateValidationRules = [
  body('status')
    .trim()
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['Pending', 'Under Review', 'Shortlisted', 'Approved', 'Rejected', 'Contacted'])
    .withMessage('Status must be one of: Pending, Under Review, Shortlisted, Approved, Rejected, Contacted'),
];





export const feedbackSubmissionValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Feedback message is required')
    .isLength({ min: 5, max: 2000 })
    .withMessage('Message must be between 5 and 2000 characters'),
];

export const feedbackStatusValidationRules = [
  body('status')
    .trim()
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['Pending', 'Reviewed'])
    .withMessage('Status must be Pending or Reviewed'),
];
