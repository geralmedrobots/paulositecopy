export const contactFields = [
  {
    name: "firstName",
    type: "text",
    autoComplete: "given-name",
    maxLength: 100,
    required: false,
    fullWidth: false,
  },
  {
    name: "lastName",
    type: "text",
    autoComplete: "family-name",
    maxLength: 100,
    required: false,
    fullWidth: false,
  },
  {
    name: "email",
    type: "email",
    autoComplete: "email",
    maxLength: 250,
    required: true,
    fullWidth: false,
  },
  {
    name: "phone",
    type: "tel",
    autoComplete: "tel",
    maxLength: 50,
    required: false,
    fullWidth: false,
  },
  {
    name: "address",
    type: "text",
    autoComplete: "street-address",
    maxLength: 250,
    required: false,
    fullWidth: true,
  },
  {
    name: "message",
    type: "textarea",
    autoComplete: "off",
    maxLength: 5000,
    required: false,
    fullWidth: true,
  },
];
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
