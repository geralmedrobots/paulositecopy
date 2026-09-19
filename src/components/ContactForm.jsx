import { useRef, useState } from "react";
import { emptyContact, validateContact, sendContact } from "../data/contact.js";
import { ui, site } from "../data/site.js";
// Configure only after a real same-origin service has been deployed and verified.
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || "";
export default function ContactForm({ data, lang }) {
  const [values, setValues] = useState({ ...emptyContact });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const busy = useRef(false);
  const form = useRef(null);
  const t = ui[lang];
  async function submit(event) {
    event.preventDefault();
    if (busy.current || !endpoint) return;
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      form.current.elements.namedItem(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    busy.current = true;
    setStatus("loading");
    try {
      await sendContact(endpoint, values);
      setStatus("success");
      setValues({ ...emptyContact });
    } catch {
      setStatus("error");
    } finally {
      busy.current = false;
    }
  }
  const fieldTypes = ["text", "text", "email", "tel", "text", "textarea"];
  const autoComplete = [
    "given-name",
    "family-name",
    "email",
    "tel",
    "street-address",
    "off",
  ];
  return (
    <form
      ref={form}
      onSubmit={submit}
      noValidate
      className="contact-form"
      aria-describedby={!endpoint ? "submission-status" : undefined}
      aria-busy={status === "loading"}
    >
      {!endpoint && (
        <div className="form-notice" id="submission-status">
          <strong lang="en">{t.unavailable}</strong>
          <p>{t.unavailableHelp}</p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      )}
      <div className="form-grid">
        {Object.keys(emptyContact).map((name, index) => {
          const Tag = fieldTypes[index] === "textarea" ? "textarea" : "input";
          return (
            <div
              className={`field ${index > 3 ? "field-full" : ""}`}
              key={name}
            >
              <label htmlFor={name}>
                {data.fields[index]}
                {name === "email" && (
                  <span>
                    {" "}
                    * <span className="sr-only">{t.required}</span>
                  </span>
                )}
              </label>
              <Tag
                id={name}
                name={name}
                type={Tag === "input" ? fieldTypes[index] : undefined}
                rows={Tag === "textarea" ? 6 : undefined}
                autoComplete={autoComplete[index]}
                required={name === "email"}
                maxLength={
                  name === "message"
                    ? 5000
                    : index < 2
                      ? 100
                      : name === "phone"
                        ? 50
                        : 250
                }
                value={values[name]}
                disabled={status === "loading"}
                aria-invalid={Boolean(errors[name])}
                aria-describedby={errors[name] ? `${name}-error` : undefined}
                onChange={(e) => {
                  setValues({ ...values, [name]: e.target.value });
                  if (errors[name]) setErrors({ ...errors, [name]: undefined });
                  if (status !== "loading") setStatus("idle");
                }}
                onBlur={() => {
                  if (name === "email")
                    setErrors({
                      ...errors,
                      email: validateContact(values).email,
                    });
                }}
              />
              {errors[name] && (
                <p className="field-error" id={`${name}-error`}>
                  {t[errors[name]]}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <button
        className="button"
        disabled={!endpoint || status === "loading"}
        type="submit"
      >
        {status === "loading" ? t.sending : data.submit}
      </button>
      <div role="status" aria-live="polite">
        {status === "success" && <p>{data.success}</p>}
        {status === "error" && <p className="field-error">{t.error}</p>}
      </div>
    </form>
  );
}
