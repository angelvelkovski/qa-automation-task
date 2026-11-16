import { expect, test } from '@/fixtures';
import { env } from '@/config/env';
import { buildNewPost } from '@/test-data/api';
import { documentTest } from '@/utils/report';

/**
 * jsonplaceholder is a fake API: POST is acknowledged but nothing is stored.
 * Decision: assert what the service really guarantees (create contract), and make the read-back
 * expectation explicit and config-driven instead of pretending persistence exists.
 */
test.describe('Posts: create and read back', () => {
  test('POST /posts acknowledges the post with a new id', async ({ postsApi }) => {
    await documentTest({
      epic: 'API',
      feature: 'Posts',
      description: 'POST /posts returns 201, echoes the payload and assigns an id. This is all a fake service guarantees.',
    });
    const payload = buildNewPost();
    const { status, body } = await postsApi.create(payload);

    expect(status).toBe(201);
    expect(body).toMatchObject(payload);
    expect(body.id).toBeGreaterThan(0);
  });

  test('read-back reflects the service persistence behaviour', async ({ postsApi }) => {
    await documentTest({
      epic: 'API',
      feature: 'Posts',
      description: 'jsonplaceholder does not persist writes. Decision: the read-back asserts 404 (switchable via API_PERSISTS_DATA for a real backend) instead of pretending the post was stored.',
    });
    const payload = buildNewPost();
    const created = await postsApi.create(payload);
    const readBack = await postsApi.getById(created.body.id);

    if (env.apiPersistsData) {
      expect(readBack.status).toBe(200);
      expect(readBack.body).toEqual(created.body);
    } else {
      expect(readBack.status, 'fake service must not persist').toBe(404);
    }
  });
});
