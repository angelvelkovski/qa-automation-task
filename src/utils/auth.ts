import path from 'path';

/** Users that have a saved login session. */
export type UserKey = 'standard' | 'problem';

/** Location of the storageState file produced by the auth setup project. */
export const authFile = (user: UserKey): string => path.join('.auth', `${user}.json`);
