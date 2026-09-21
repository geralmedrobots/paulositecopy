import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import { useContactForm } from "../../hooks/useContactForm";
import { contactInfo } from "../../data/products";
import { useI18n } from "../../i18n/i18n";
import "./Contact.css";

function Contact() {
  const { t } = useI18n(); const c = t.contact;
  const { values, errors, submitted, handleChange, handleSubmit } = useContactForm(c);
  const fields = [["firstName", "text", c.fields[0]], ["lastName", "text", c.fields[1]], ["email", "email", c.fields[2]], ["phone", "tel", c.fields[3]], ["address", "text", c.fields[4]]];
  return <Section id="contacts" alt><p className="eyebrow">{c.eyebrow}</p><h2>{c.title}</h2><p className="section-sub">{c.intro}</p><div className="contact__grid"><form className="contact-form" onSubmit={handleSubmit} noValidate>{fields.map(([name, type, label], index) => <div className={index === 4 ? "contact-form__full" : ""} key={name}><label htmlFor={name}>{label}</label><input id={name} name={name} type={type} value={values[name]} onChange={handleChange} aria-invalid={Boolean(errors[name])} required={index < 3} />{errors[name] && <span className="contact-form__error">{errors[name]}</span>}</div>)}<div className="contact-form__full"><label htmlFor="message">{c.fields[5]}</label><textarea id="message" name="message" placeholder={c.placeholder} value={values.message} onChange={handleChange} /></div><div className="contact-form__full"><Button type="submit">{c.submit}</Button>{submitted && <p className="contact-form__success">{c.success}</p>}</div></form><div className="contact-info"><div className="contact-info__item"><span className="contact-info__icon" aria-hidden="true">&#9742;</span><span>Tel. {contactInfo.phone}<br />Tlm. {contactInfo.mobile}</span></div><div className="contact-info__item"><span className="contact-info__icon" aria-hidden="true">&#9993;</span><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></div>{contactInfo.addresses.map((address) => <div className="contact-info__item" key={address}><span className="contact-info__icon" aria-hidden="true">&#128205;</span><span>{address}</span></div>)}</div></div></Section>;
}
export default Contact;
