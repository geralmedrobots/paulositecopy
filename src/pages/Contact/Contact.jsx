import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import { useContactForm } from "../../hooks/useContactForm";
import { contactInfo } from "../../data/products";
import "./Contact.css";

function Contact() {
  const { values, errors, submitted, handleChange, handleSubmit } = useContactForm();

  return (
    <Section id="contacts" alt>
      <p className="eyebrow">Get in touch</p>
      <h2>Contact</h2>
      <p className="section-sub">
        Thank you for getting in touch with us. We will get back to you as soon as possible.
      </p>

      <div className="contact__grid">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={values.firstName}
              onChange={handleChange}
              aria-invalid={Boolean(errors.firstName)}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={values.lastName}
              onChange={handleChange}
              aria-invalid={Boolean(errors.lastName)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" value={values.phone} onChange={handleChange} />
          </div>
          <div className="contact-form__full">
            <label htmlFor="address">Address</label>
            <input id="address" name="address" type="text" value={values.address} onChange={handleChange} />
          </div>
          <div className="contact-form__full">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Type your message here"
              value={values.message}
              onChange={handleChange}
            />
          </div>
          <div className="contact-form__full">
            <Button type="submit">Submit</Button>
            {submitted && <p className="contact-form__success">Thanks for submitting!</p>}
          </div>
        </form>

        <div className="contact-info">
          <div className="contact-info__item">
            <span className="contact-info__icon" aria-hidden="true">
              &#9742;
            </span>
            <span>
              Tel. {contactInfo.phone}
              <br />
              Tlm. {contactInfo.mobile}
            </span>
          </div>
          <div className="contact-info__item">
            <span className="contact-info__icon" aria-hidden="true">
              &#9993;
            </span>
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          </div>
          {contactInfo.addresses.map((address) => (
            <div className="contact-info__item" key={address}>
              <span className="contact-info__icon" aria-hidden="true">
                &#128205;
              </span>
              <span>{address}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Contact;
