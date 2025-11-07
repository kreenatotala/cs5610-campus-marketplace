const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

async function request(path, { method = "GET", body, headers = {}, ...options } = {}) {
  const response = await fetch(path, {
    method,
    headers: { ...defaultHeaders, ...headers },
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = new Error(payload?.error || response.statusText);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export function post(path, body, options) {
  return request(path, { method: "POST", body, ...options });
}

export default { request, post };
