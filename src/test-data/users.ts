import { env } from '@/config/env';
import type { UserKey } from '@/utils/auth';

/** Login accounts, sourced from configuration. */
export const users: Record<UserKey, { username: string; password: string }> = env.credentials;

/** Known, tracked defects per user. Presence of an entry flips the checkout test to expected-failure. */
export const knownDefects: Partial<Record<UserKey, string>> = {
  problem: 'KNOWN DEFECT: problem_user has broken cart/checkout behaviour on saucedemo (see README, Design decisions).',
};
