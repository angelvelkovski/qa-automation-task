import type { APIRequestContext } from '@playwright/test';

export interface ApiResponse<T> {
  status: number;
  body: T;
}

/** Shared transport. Subclasses expose typed, intention-revealing methods; tests never build URLs. */
export abstract class BaseApiClient {
  constructor(protected readonly request: APIRequestContext) {}

  protected async get<T>(path: string): Promise<ApiResponse<T>> {
    return this.parse<T>(await this.request.get(path));
  }

  protected async post<T>(path: string, data: unknown): Promise<ApiResponse<T>> {
    return this.parse<T>(await this.request.post(path, { data }));
  }

  private async parse<T>(response: Awaited<ReturnType<APIRequestContext['get']>>): Promise<ApiResponse<T>> {
    const text = await response.text();
    return { status: response.status(), body: (text ? JSON.parse(text) : undefined) as T };
  }
}
