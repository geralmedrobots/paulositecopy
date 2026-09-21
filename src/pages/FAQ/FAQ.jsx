import Section from "../../components/Section/Section";
import FAQItem from "../../components/FAQItem/FAQItem";
import { useI18n } from "../../i18n/i18n";
import "./FAQ.css";

function FAQ() {
  const { t } = useI18n();
  return <Section id="faq"><p className="eyebrow">{t.faq.eyebrow}</p><h1 className="section-page-title">FAQ</h1><div className="faq-list">{t.faq.items.map(([question, answer], index) => <FAQItem key={question} question={question} answer={answer} defaultOpen={index === 0} />)}</div></Section>;
}
export default FAQ;
