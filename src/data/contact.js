export const emptyContact = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  message: "",
};
export function validateContact(values) {
  const errors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "emailError";
  return errors;
}
export async function sendContact(endpoint, values, fetcher = fetch) {
  if (!endpoint) throw new Error("SUBMISSION NOT AVAILABLE");
  if (!endpoint.startsWith("/") || endpoint.startsWith("//"))
    throw new Error("A same-origin endpoint is required");
  const response = await fetcher(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    signal: AbortSignal.timeout(15000),
  });
  if (
    !response.ok ||
    !response.headers?.get("content-type")?.includes("application/json")
  )
    throw new Error("Submission failed");
  const receipt = await response.json();
  if (receipt?.ok !== true) throw new Error("Submission failed");
}
