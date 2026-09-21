import { useState } from "react";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  message: "",
};

/**
 * Client-side only form state + validation.
 * Submission is abstracted behind `onSubmitSuccess` so a real backend
 * or email service can be wired in later without touching the UI.
 */
export function useContactForm(messages, onSubmitSuccess) {
  const [values, setValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!values.firstName.trim()) nextErrors.firstName = messages.required;
    if (!values.lastName.trim()) nextErrors.lastName = messages.required;
    if (!values.email.trim() || !values.email.includes("@")) {
      nextErrors.email = messages.validEmail;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    // Placeholder for a future backend/email integration.
    setSubmitted(true);
    setValues(INITIAL_STATE);
    onSubmitSuccess?.();
  };

  return { values, errors, submitted, handleChange, handleSubmit };
}
