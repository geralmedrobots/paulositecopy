export const contactFields = [
  {
    name: "firstName",
    label: "First Name",
    autocomplete: "given-name",
    maxLength: 100,
  },
  {
    name: "lastName",
    label: "Last Name",
    autocomplete: "family-name",
    maxLength: 100,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    autocomplete: "email",
    required: true,
    maxLength: 254,
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    autocomplete: "tel",
    maxLength: 50,
  },
  {
    name: "address",
    label: "Address",
    autocomplete: "street-address",
    wide: true,
    maxLength: 500,
  },
  {
    name: "message",
    label: "Type your message here",
    multiline: true,
    wide: true,
    maxLength: 10000,
  },
];
export const orderFields = [
  { name: "name", label: "Name", autocomplete: "name", maxLength: 200 },
  contactFields[2],
  contactFields[5],
];
export const formMessages = {
  unavailable:
    "Online submission is currently unavailable. Please contact us by email.",
  email: "Enter a valid email address.",
  tooLong: "This field exceeds the maximum length.",
  sending: "Sending…",
  success: "Thanks for submitting!",
  failure:
    "Unable to confirm delivery. Please try again or contact us by email.",
};
export const fieldsFor = (kind) =>
  kind === "order" ? orderFields : contactFields;
