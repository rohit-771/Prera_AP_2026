import express from 'express';
import { login, getMe, getDashboardStats } from '../controllers/admin.controller.js';
import {
  getEvents,
  getEventById,
  updateEventStatus,
  deleteEvent,
} from '../controllers/event.controller.js';
import {
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} from '../controllers/application.controller.js';
import {
  adminLoginValidationRules,
  statusUpdateValidationRules,
  validate,
} from '../middleware/validation.middleware.js';
import { authenticateAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public: Admin Login
router.post('/login', adminLoginValidationRules, validate, login);

// Protected: Admin profile & dashboard overview
router.get('/me', authenticateAdmin, getMe);
router.get('/stats', authenticateAdmin, getDashboardStats);

// Protected: Event Management under /api/admin/events
router.get('/events', authenticateAdmin, getEvents);
router.get('/events/:id', authenticateAdmin, getEventById);
router.patch('/events/:id/status', authenticateAdmin, statusUpdateValidationRules, validate, updateEventStatus);
router.delete('/events/:id', authenticateAdmin, deleteEvent);

// Protected: Application Management under /api/admin/applications
router.get('/applications', authenticateAdmin, getApplications);
router.get('/applications/:id', authenticateAdmin, getApplicationById);
router.patch('/applications/:id/status', authenticateAdmin, statusUpdateValidationRules, validate, updateApplicationStatus);
router.delete('/applications/:id', authenticateAdmin, deleteApplication);

export default router;
