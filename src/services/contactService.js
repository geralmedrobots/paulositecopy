import { fieldsFor, formMessages } from "../data/forms.js";
export const configuredEndpoint = import.meta.env?.VITE_CONTACT_ENDPOINT || "";
export function isValidEndpoint(endpoint) {
  if (
    typeof endpoint !== "string" ||
    !endpoint.trim() ||
    endpoint !== endpoint.trim()
  )
    return false;
  if (
    endpoint.startsWith("/") &&
    !endpoint.startsWith("//") &&
    !endpoint.includes("\\") &&
    !/[\s#]/.test(endpoint)
  )
    return true;
  try {
    const url = new URL(endpoint);
    return (
      url.protocol === "https:" && !url.username && !url.password && !url.hash
    );
  } catch {
    return false;
  }
}
export function validateContact(values, kind = "contact") {
  const errors = {};
  for (const field of fieldsFor(kind)) {
    const value = String(values[field.name] ?? "").trim();
    if (
      field.name === "email" &&
      (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value.length > 254)
    )
      errors.email = formMessages.email;
    else if (value.length > field.maxLength)
      errors[field.name] = formMessages.tooLong;
  }
  return errors;
}
export async function submitContact(
  values,
  {
    kind = "contact",
    endpoint = configuredEndpoint,
    fetchImpl = globalThis.fetch,
    signal,
    requestId,
    timeoutMs = 15000,
  } = {},
) {
  if (!isValidEndpoint(endpoint)) throw new Error(formMessages.unavailable);
  if (Object.keys(validateContact(values, kind)).length)
    throw new Error(formMessages.email);
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal?.addEventListener("abort", abort, { once: true });
  if (signal?.aborted) controller.abort();
  const timeout = setTimeout(abort, timeoutMs);
  try {
    const fields = Object.fromEntries(
      fieldsFor(kind).map((field) => [
        field.name,
        String(values[field.name] ?? "").trim(),
      ]),
    );
    const response = await fetchImpl(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "omit",
      redirect: "error",
      signal: controller.signal,
      body: JSON.stringify({ kind, fields, requestId }),
    });
    if (!response.ok) throw new Error(formMessages.failure);
    const result = await response.json();
    if (result?.ok !== true) throw new Error(formMessages.failure);
    return { ok: true };
  } catch {
    throw new Error(formMessages.failure);
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", abort);
  }
}
