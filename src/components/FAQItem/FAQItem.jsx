import "./FAQItem.css";

function FAQItem({ question, answer, defaultOpen = false }) {
  return (
    <details className="faq-item" open={defaultOpen}>
      <summary>{question}</summary>
      <p>{answer}</p>
    </details>
  );
}

export default FAQItem;
