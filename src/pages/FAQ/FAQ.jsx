import Section from "../../components/Section/Section";
import FAQItem from "../../components/FAQItem/FAQItem";
import { faqItems } from "../../data/faq";
import "./FAQ.css";

function FAQ() {
  return (
    <Section id="faq">
      <p className="eyebrow">Perguntas frequentes</p>
      <h2>FAQ</h2>

      <div className="faq-list">
        {faqItems.map((item, index) => (
          <FAQItem
            key={item.question}
            question={item.question}
            answer={item.answer}
            defaultOpen={index === 0}
          />
        ))}
      </div>
    </Section>
  );
}

export default FAQ;
