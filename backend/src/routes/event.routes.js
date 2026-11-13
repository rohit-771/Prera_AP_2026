import express from 'express';
import {
  createEventSubmission,
  getEvents,
  getEventById,
  updateEventStatus,
  deleteEvent,
} from '../controllers/event.controller.js';
import {
  eventSubmissionValidationRules,
  statusUpdateValidationRules,
  validate,
} from '../middleware/validation.middleware.js';
import { authenticateAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public: Submit event proposal
router.post('/', eventSubmissionValidationRules, validate, createEventSubmission);

// Admin Protected: Manage events
router.get('/', authenticateAdmin, getEvents);
router.get('/:id', authenticateAdmin, getEventById);
router.patch('/:id/status', authenticateAdmin, statusUpdateValidationRules, validate, updateEventStatus);
router.delete('/:id', authenticateAdmin, deleteEvent);

export default router;
