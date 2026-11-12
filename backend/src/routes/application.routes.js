import express from 'express';
import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} from '../controllers/application.controller.js';
import {
  workApplicationValidationRules,
  statusUpdateValidationRules,
  validate,
} from '../middleware/validation.middleware.js';
import { authenticateAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public: Submit work/join application
router.post('/', workApplicationValidationRules, validate, createApplication);

// Admin Protected: Manage applications
router.get('/', authenticateAdmin, getApplications);
router.get('/:id', authenticateAdmin, getApplicationById);
router.patch('/:id/status', authenticateAdmin, statusUpdateValidationRules, validate, updateApplicationStatus);
router.delete('/:id', authenticateAdmin, deleteApplication);

export default router;
