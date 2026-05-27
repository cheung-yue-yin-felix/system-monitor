export default function createExternalApi(baseURL, defaultHeaders = {}) {
  return async (endpoint, options = {}) => {
    // Build URL with query parameters (cleanest way)
    const url = new URL(`${baseURL}${endpoint}`);

    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value);
        }
      });
    }

    // Final fetch options
    const fetchOptions = {
      method: options.method || 'GET',
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    // Only add body for POST/PUT/PATCH etc.
    if (options.body && ['POST', 'PUT', 'PATCH'].includes(fetchOptions.method)) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    const response = await fetch(url.toString(), fetchOptions);

    if (!response.ok) {
      let errorData = {};
      try {
        errorData = await response.json();
      } catch (e) {
        console.error('Error creating api request', e);
      }

      throw {
        status: response.status,
        message:
          errorData.message || errorData.error || response.statusText || 'External API error',
        ...errorData,
      };
    }

    return response.json();
  };
}
