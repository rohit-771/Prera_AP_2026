
import express from 'express';
import { createFeedback } from '../controllers/feedback.controller.js';
import {
  feedbackSubmissionValidationRules,
  validate,
} from '../middleware/validation.middleware.js';

const router = express.Router();

// Public: Submit feedback
router.post('/', feedbackSubmissionValidationRules, validate, createFeedback);

export default router;
