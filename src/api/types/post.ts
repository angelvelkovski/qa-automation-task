/** Type aliases (not interfaces) so they are assignable to Record<string, unknown> in matchers. */
export type NewPost = {
  userId: number;
  title: string;
  body: string;
};

export type Post = NewPost & { id: number };
