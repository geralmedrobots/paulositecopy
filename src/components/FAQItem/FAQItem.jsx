import { useId } from "react";
import "./FAQItem.css";

function FAQItem({ question, answer, isOpen, onToggle }) {
  const id = useId();
  const buttonId = `faq-question-${id}`;
  const panelId = `faq-answer-${id}`;

  return (
    <article className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
      <h2>
        <button id={buttonId} type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={onToggle}>
          <span>{question}</span><span className="faq-item__indicator" aria-hidden="true">{isOpen ? "−" : "+"}</span>
        </button>
      </h2>
      <div id={panelId} className="faq-item__panel" role="region" aria-labelledby={buttonId} hidden={!isOpen}>
        <p>{answer}</p>
      </div>
    </article>
  );
}

export default FAQItem;
