import { useRef, useState } from "react";
import {
  ContactApiError,
  createIdempotencyKey,
  normalizeContact,
  submitContact,
} from "../services/contactApi";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  message: "",
};

function messageFor(messages, code) {
  return messages.errors?.[code] ?? messages.errors?.fallback ?? messages.required;
}

export function useContactForm(messages) {
  const [values, setValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [submission, setSubmission] = useState({ status: "idle", message: "" });
  const inFlight = useRef(false);
  const retry = useRef({ fingerprint: null, key: null });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    if (submission.status !== "submitting") {
      setSubmission({ status: "idle", message: "" });
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!values.firstName.trim()) nextErrors.firstName = messages.required;
    if (!values.lastName.trim()) nextErrors.lastName = messages.required;
    if (!values.email.trim() || !values.email.includes("@")) {
      nextErrors.email = messages.validEmail;
    }
    if (!values.message.trim()) nextErrors.message = messages.required;
    setErrors(nextErrors);
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inFlight.current) return;

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setSubmission({ status: "error", message: messageFor(messages, "validation") });
      return;
    }

    const fingerprint = JSON.stringify(normalizeContact(values));
    if (retry.current.fingerprint !== fingerprint) {
      retry.current = { fingerprint, key: createIdempotencyKey() };
    }

    inFlight.current = true;
    setSubmission({ status: "submitting", message: messages.submitting });

    try {
      await submitContact(values, { idempotencyKey: retry.current.key });
      setValues(INITIAL_STATE);
      setErrors({});
      retry.current = { fingerprint: null, key: null };
      setSubmission({ status: "success", message: messages.success });
    } catch (error) {
      const code = error instanceof ContactApiError ? error.code : "fallback";
      setSubmission({ status: "error", message: messageFor(messages, code) });
    } finally {
      inFlight.current = false;
    }
  };

  return {
    values,
    errors,
    status: submission.status,
    feedback: submission.message,
    isSubmitting: submission.status === "submitting",
    handleChange,
    handleSubmit,
  };
}
