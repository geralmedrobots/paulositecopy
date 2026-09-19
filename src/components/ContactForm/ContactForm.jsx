import { useId } from "react";
import { useContactForm } from "../../hooks/useContactForm";
import { formMessages } from "../../data/forms";
import { contactInfo } from "../../data/contact";
import Button from "../Button/Button";
import "./ContactForm.css";
export default function ContactForm({ kind = "contact" }) {
  const id = useId();
  const form = useContactForm(kind);
  const busy = form.status === "sending";
  return (
    <form
      className={`contact-form contact-form--${kind}`}
      onSubmit={form.handleSubmit}
      noValidate
      aria-busy={busy}
    >
      <fieldset disabled={busy}>
        <legend className="sr-only">
          {kind === "order" ? "Order inquiry" : "Contact"}
        </legend>
        <div className="form-grid">
          {form.fields.map((field) => {
            const inputId = `${id}-${field.name}`;
            const error = form.errors[field.name];
            const props = {
              id: inputId,
              name: field.name,
              value: form.values[field.name],
              required: field.required,
              maxLength: field.maxLength,
              autoComplete: field.autocomplete,
              onChange: form.handleChange,
              "aria-invalid": Boolean(error),
              "aria-describedby": error ? `${inputId}-error` : undefined,
            };
            return (
              <div
                className={
                  field.wide ? "form-field form-field--wide" : "form-field"
                }
                key={field.name}
              >
                <label htmlFor={inputId}>
                  {field.label}
                  {field.required ? " *" : ""}
                </label>
                {field.multiline ? (
                  <textarea {...props} rows={4} />
                ) : (
                  <input {...props} type={field.type || "text"} />
                )}{" "}
                {error && (
                  <p className="form-error" id={`${inputId}-error`}>
                    {error}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </fieldset>
      {!form.available && (
        <p className="form-notice">
          {formMessages.unavailable}{" "}
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
        </p>
      )}
      <Button
        variant="dark"
        type="submit"
        disabled={busy || !form.available || form.status === "success"}
      >
        {busy ? formMessages.sending : "Submit"}
      </Button>
      <p
        className={form.status === "error" ? "form-error" : "form-status"}
        role="status"
        aria-live="polite"
      >
        {form.message}
      </p>
    </form>
  );
}
