import { test as setup } from '@/fixtures';
import { users } from '@/test-data/users';
import { authFile, type UserKey } from '@/utils/auth';

/** Logs in once per user and stores the session; UI tests start already authenticated. */
for (const key of Object.keys(users) as UserKey[]) {
  setup(`authenticate ${key} user`, async ({ loginPage, inventoryPage, page }) => {
    await loginPage.open();
    await loginPage.login(users[key].username, users[key].password);
    await inventoryPage.expectLoaded();
    await page.context().storageState({ path: authFile(key) });
  });
}
