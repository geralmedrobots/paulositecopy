import { useState } from "react";
import Section from "../../components/Section/Section";
import FAQItem from "../../components/FAQItem/FAQItem";
import { useI18n } from "../../i18n/i18n";
import "./FAQ.css";

function FAQ() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section id="faq" className="faq-page">
      <div className="faq-heading">
        <p className="eyebrow">{t.faq.eyebrow}</p>
        <h1 className="section-page-title">FAQ</h1>
      </div>
      <div className="faq-list">
        {t.faq.items.map(([question, answer], index) => (
          <FAQItem key={question} question={question} answer={answer} isOpen={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? -1 : index)} />
        ))}
      </div>
    </Section>
  );
}

export default FAQ;
