const CONTACT_PATH = "/api/v1/contacts";
const CONFIGURED_API_BASE_URL = import.meta.env?.VITE_API_BASE_URL?.trim() ?? "";

export class ContactApiError extends Error {
  constructor(code, requestId = null) {
    super(code);
    this.name = "ContactApiError";
    this.code = code;
    this.requestId = requestId;
  }
}

export function normalizeContact(values) {
  const optional = (value) => {
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  };

  return {
    first_name: values.firstName.trim(),
    last_name: values.lastName.trim(),
    email: values.email.trim(),
    phone: optional(values.phone),
    address: optional(values.address),
    message: values.message.trim(),
  };
}

export function getContactEndpoint(baseUrl = CONFIGURED_API_BASE_URL) {
  const normalized = baseUrl.trim().replace(/\/+$/, "");
  if (!normalized) throw new ContactApiError("configuration");

  let parsed;
  try {
    parsed = new URL(normalized);
  } catch {
    throw new ContactApiError("configuration");
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new ContactApiError("configuration");
  }

  return `${normalized}${CONTACT_PATH}`;
}

export function createIdempotencyKey() {
  if (!globalThis.crypto?.randomUUID) {
    throw new ContactApiError("configuration");
  }
  return globalThis.crypto.randomUUID();
}

function classifyStatus(status) {
  if (status === 413) return "requestTooLarge";
  if (status === 422) return "validation";
  if (status === 429) return "rateLimit";
  if (status === 500) return "server";
  if (status === 503) return "unavailable";
  return "fallback";
}

export async function submitContact(
  values,
  {
    idempotencyKey,
    signal,
    baseUrl = CONFIGURED_API_BASE_URL,
    fetchImpl = globalThis.fetch,
  } = {},
) {
  const endpoint = getContactEndpoint(baseUrl);
  const headers = { "Content-Type": "application/json" };
  if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;

  let response;
  try {
    response = await fetchImpl(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(normalizeContact(values)),
      signal,
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new ContactApiError("network");
  }

  const requestId = response.headers?.get?.("x-request-id") ?? null;
  if (!response.ok) {
    throw new ContactApiError(classifyStatus(response.status), requestId);
  }

  return {
    data: await response.json(),
    requestId,
  };
}
