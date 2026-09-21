import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import { useContactForm } from "../../hooks/useContactForm";
import { contactInfo } from "../../data/products";
import { useI18n } from "../../i18n/i18n";
import "./Contact.css";

const fieldDefinitions = [
  { name: "firstName", type: "text", required: true },
  { name: "lastName", type: "text", required: true },
  { name: "email", type: "email", required: true },
  { name: "phone", type: "tel", required: false },
  { name: "address", type: "text", required: false, full: true },
];

function Contact() {
  const { t } = useI18n();
  const copy = t.contact;
  const { values, errors, submitted, handleChange, handleSubmit } = useContactForm(copy);

  return (
    <Section id="contacts" alt>
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1 className="section-page-title">{copy.title}</h1>
      <p className="section-sub">{copy.intro}</p>
      <div className="contact__grid">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {fieldDefinitions.map(({ name, type, required, full }) => {
            const errorId = `${name}-error`;
            return (
              <div className={full ? "contact-form__full" : ""} key={name}>
                <label htmlFor={name}>{copy.fields[name]}</label>
                <input id={name} name={name} type={type} value={values[name]} onChange={handleChange} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? errorId : undefined} required={required} />
                {errors[name] && <span id={errorId} className="contact-form__error" role="alert">{errors[name]}</span>}
              </div>
            );
          })}
          <div className="contact-form__full">
            <label htmlFor="message">{copy.fields.message}</label>
            <textarea id="message" name="message" placeholder={copy.placeholder} value={values.message} onChange={handleChange} />
          </div>
          <div className="contact-form__full">
            <Button type="submit">{copy.submit}</Button>
            {submitted && <p className="contact-form__success" role="status" aria-live="polite">{copy.success}</p>}
          </div>
        </form>
        <div className="contact-info">
          <div className="contact-info__item"><span className="contact-info__icon" aria-hidden="true">&#9742;</span><span>Tel. {contactInfo.phone}<br />Tlm. {contactInfo.mobile}</span></div>
          <div className="contact-info__item"><span className="contact-info__icon" aria-hidden="true">&#9993;</span><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></div>
          {contactInfo.addresses.map((address) => <div className="contact-info__item" key={address}><span className="contact-info__icon" aria-hidden="true">&#128205;</span><span>{address}</span></div>)}
        </div>
      </div>
    </Section>
  );
}

export default Contact;
