import type { NewPost } from '@/api/types/post';

/** jsonplaceholder seeds users 1..10; user 1 is used for the contract test. */
export const existingUserId = 1;

export function buildNewPost(overrides: Partial<NewPost> = {}): NewPost {
  return { userId: existingUserId, title: 'qa task title', body: 'qa task body', ...overrides };
}
