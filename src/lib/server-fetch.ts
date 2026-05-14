const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

const serverFetchHelper = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const { headers, ...restOptions } = options;

  const res = await fetch(`${BACKEND_API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...restOptions,
  });

  return res;
};

export const serverFetch = {
  get: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, {
      method: 'GET',
      ...options,
    }),

  post: (endpoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endpoint, {
      method: 'POST',
      ...options,
    }),

  put: (endpoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endpoint, {
      method: 'PUT',
      ...options,
    }),

  patch: (endpoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endpoint, {
      method: 'PATCH',
      ...options,
    }),

  delete: (endpoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endpoint, {
      method: 'DELETE',
      ...options,
    }),
};
