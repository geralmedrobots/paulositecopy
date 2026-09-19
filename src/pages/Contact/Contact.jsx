import Section from "../../components/Section/Section";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactInfo from "../../components/ContactInfo/ContactInfo";
import Media from "../../components/Media/Media";
export default function Contact() {
  return (
    <Section>
      <div className="contact-layout">
        <div>
          <h1>Contact</h1>
          <p>
            Thank you for getting in touch with us. We will get back to you as
            soon as possible.
          </p>
          <ContactForm />
          <ContactInfo />
        </div>
        <Media name="contact-engineer" eager />
      </div>
    </Section>
  );
}
