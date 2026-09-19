import "./FAQItem.css";
export default function FAQItem({ question, answer }) {
  return (
    <article className="faq-item">
      <h2>{question}</h2>
      <p>{answer}</p>
    </article>
  );
}
