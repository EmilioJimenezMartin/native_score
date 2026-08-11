import { err, ok, type Result } from "@/lib/types/result";

export class HttpError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

type RequestOptions = Omit<RequestInit, "body"> & { body?: unknown };

async function request<T>(
  url: string,
  { body, headers, ...init }: RequestOptions = {},
): Promise<Result<T, HttpError>> {
  try {
    const response = await fetch(url, {
      ...init,
      headers: { "Content-Type": "application/json", ...headers },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!response.ok) {
      return err(new HttpError(response.statusText, response.status));
    }

    if (response.status === 204) {
      return ok(undefined as T);
    }

    return ok((await response.json()) as T);
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : "Network error";
    return err(new HttpError(message, 0));
  }
}

export const httpService = {
  get: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, { ...options, method: "GET" }),
  post: <T>(url: string, body?: unknown, options?: RequestOptions) =>
    request<T>(url, { ...options, method: "POST", body }),
  put: <T>(url: string, body?: unknown, options?: RequestOptions) =>
    request<T>(url, { ...options, method: "PUT", body }),
  delete: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, { ...options, method: "DELETE" }),
};
