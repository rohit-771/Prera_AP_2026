
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

import prisma from './config/db.js';
import eventRoutes from './routes/event.routes.js';
import applicationRoutes from './routes/application.routes.js';
import adminRoutes from './routes/admin.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';

import {
  notFoundHandler,
  errorHandler,
} from './middleware/errorHandler.middleware.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Trust proxy
app.set('trust proxy', 1);

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Development fallback
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Logging
app.use(
  morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined')
);

// Body Parsers
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Rate Limiters
const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: {
    success: false,
    message:
      'Too many submissions from this IP address. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Health Check
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return res.status(200).json({
      status: 'UP',
      timestamp: new Date().toISOString(),
      database: 'Connected',
      service: 'PRERA Forms & Application Backend API',
    });
  } catch (error) {
    return res.status(503).json({
      status: 'DOWN',
      timestamp: new Date().toISOString(),
      database: 'Disconnected',
      error: error.message,
    });
  }
});

// API Routes
app.use('/api/events', submissionLimiter, eventRoutes);
app.use('/api/applications', submissionLimiter, applicationRoutes);
app.use('/api/feedback', submissionLimiter, feedbackRoutes);

app.use('/api/admin/login', loginLimiter);
app.use('/api/admin', adminRoutes);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
const server = app.listen(PORT, () => {
  console.log('===============================================');
  console.log(`🚀 PRERA Backend API Server running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🎪 Events API:   http://localhost:${PORT}/api/events`);
  console.log(`💼 Application:  http://localhost:${PORT}/api/applications`);
  console.log(`🔐 Admin API:    http://localhost:${PORT}/api/admin`);
  console.log(`⭐ Feedback API: http://localhost:${PORT}/api/feedback`);
  console.log('===============================================');
});

// Graceful Shutdown
const shutdown = async (signal) => {
  console.log(`${signal} signal received. Closing server...`);

  server.close(async () => {
    await prisma.$disconnect();
    console.log('HTTP server closed, Prisma disconnected.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

export default app;
