import { Hero } from "../../components/Hero/Hero.jsx";
import { Picture } from "../../components/Media/Picture.jsx";
import { ContactInformation } from "../../components/ContactInformation/ContactInformation.jsx";
import ContactForm from "../../components/ContactForm.jsx";
export function Contact({ data, lang }) {
  return (
    <>
      <Hero title={data.title} lang={lang} />
      <section className="section">
        <div className="container contact-grid">
          <div className="stack">
            <Picture name="contacts-0" className="contact-image" />
            <ContactInformation lang={lang} />
          </div>
          <ContactForm data={data} lang={lang} />
        </div>
      </section>
    </>
  );
}
