import { BaseApiClient } from './BaseApiClient';
import type { NewPost, Post } from './types/post';

export class PostsClient extends BaseApiClient {
  create(post: NewPost) {
    return this.post<Post>('/posts', post);
  }

  getById(id: number) {
    return this.get<Post>(`/posts/${id}`);
  }
}
