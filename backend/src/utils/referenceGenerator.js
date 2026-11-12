import crypto from 'crypto';

/**
 * Generates a clean, unique, human-readable reference ID.
 * @param {'EVT' | 'APP'} prefix - Type indicator
 * @returns {string} - e.g. PRERA-EVT-20261107-7K2M
 */
export const generateReferenceId = (prefix = 'EVT') => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = crypto.randomBytes(3).toString('hex').toUpperCase(); // 6 chars
  return `PRERA-${prefix}-${dateStr}-${randomSuffix}`;
};
