export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found at ${req.originalUrl}`,
  });
};

export const errorHandler = (err, req, res, next) => {
  console.error('[API Error]:', err);

  // Prisma unique constraint violation
  if (err.code === 'P2002') {
    const target = err.meta?.target ? `Duplicate field: ${err.meta.target}` : 'Record already exists.';
    return res.status(409).json({
      success: false,
      message: target,
    });
  }

  // Prisma record not found
  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'Requested record was not found.',
    });
  }

  // JSON parsing error
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON payload received.',
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'production' && statusCode === 500
      ? 'An unexpected error occurred. Please try again later.'
      : message,
  });
};
