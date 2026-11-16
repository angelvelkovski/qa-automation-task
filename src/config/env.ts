import dotenv from 'dotenv';

dotenv.config({ quiet: true });

/** Reads a required environment variable; fails fast with a clear message. */
function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var ${name}. Copy .env.example to .env.`);
  return value;
}

/** Single typed entry point for all configuration. No other file reads process.env. */
export const env = {
  uiBaseUrl: required('UI_BASE_URL'),
  apiBaseUrl: required('API_BASE_URL'),
  taxRate: Number(required('TAX_RATE')),
  apiPersistsData: required('API_PERSISTS_DATA') === 'true',
  credentials: {
    standard: { username: required('STANDARD_USER'), password: required('STANDARD_PASSWORD') },
    problem: { username: required('PROBLEM_USER'), password: required('PROBLEM_PASSWORD') },
  },
} as const;
