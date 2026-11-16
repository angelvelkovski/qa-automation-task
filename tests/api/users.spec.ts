import { expect, test } from '@/fixtures';
import { userSchema } from '@/api/schemas/user.schema';
import { existingUserId } from '@/test-data/api';
import { documentTest } from '@/utils/report';
import { validateSchema } from '@/utils/schema';

test('GET user matches the user contract', async ({ usersApi }) => {
  await documentTest({
    epic: 'API',
    feature: 'Users',
    description: 'GET /users/{id} returns 200 and a body that satisfies the user JSON schema (contract check, not field by field).',
  });
  const { status, body } = await usersApi.getById(existingUserId);

  expect(status).toBe(200);
  expect(validateSchema(userSchema, body), 'schema violations').toEqual([]);
  expect(body.id).toBe(existingUserId);
});
