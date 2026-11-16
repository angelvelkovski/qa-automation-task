import { BaseApiClient } from './BaseApiClient';
import type { User } from './types/user';

export class UsersClient extends BaseApiClient {
  getById(id: number) {
    return this.get<User>(`/users/${id}`);
  }
}
