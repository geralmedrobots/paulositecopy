import { useEffect, useRef, useState } from "react";
import { fieldsFor, formMessages } from "../data/forms";
import {
  configuredEndpoint,
  isValidEndpoint,
  submitContact,
  validateContact,
} from "../services/contactService";
export function useContactForm(kind = "contact") {
  const fields = fieldsFor(kind);
  const [values, setValues] = useState(() =>
    Object.fromEntries(fields.map((field) => [field.name, ""])),
  );
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const pending = useRef(null);
  const request = useRef(null);
  const available = isValidEndpoint(configuredEndpoint);
  useEffect(() => () => pending.current?.abort(), []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    setStatus("idle");
    setMessage("");
    request.current = null;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (pending.current) return;
    const nextErrors = validateContact(values, kind);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      event.currentTarget.elements
        .namedItem(Object.keys(nextErrors)[0])
        ?.focus();
      return;
    }
    if (!available) {
      setStatus("error");
      setMessage(formMessages.unavailable);
      return;
    }
    const controller = new AbortController();
    pending.current = controller;
    request.current ||= crypto.randomUUID();
    setStatus("sending");
    setMessage("");
    try {
      await submitContact(values, {
        kind,
        signal: controller.signal,
        requestId: request.current,
      });
      if (!controller.signal.aborted) {
        setStatus("success");
        setMessage(formMessages.success);
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        setStatus("error");
        setMessage(error.message);
      }
    } finally {
      pending.current = null;
    }
  };
  return {
    fields,
    values,
    errors,
    status,
    message,
    available,
    handleChange,
    handleSubmit,
  };
}
