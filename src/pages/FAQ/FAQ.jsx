import Section from "../../components/Section/Section";
import FAQItem from "../../components/FAQItem/FAQItem";
import { faqItems } from "../../data/faq";
export default function FAQ() {
  return (
    <Section>
      <div className="prose">
        <h1>FAQ</h1>
        {faqItems.map((item) => (
          <FAQItem key={item.question} {...item} />
        ))}
      </div>
    </Section>
  );
}
