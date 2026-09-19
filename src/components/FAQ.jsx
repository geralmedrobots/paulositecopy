import { useState } from "react";
export default function FAQ({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="accordion">
      {items.map((item, index) => (
        <section className="faq-item" key={item.question}>
          <h2>
            <button
              id={`question-${index}`}
              aria-expanded={open === index}
              aria-controls={`answer-${index}`}
              onClick={() => setOpen(open === index ? null : index)}
            >
              {item.question}
              <span aria-hidden="true">{open === index ? "−" : "+"}</span>
            </button>
          </h2>
          <div
            id={`answer-${index}`}
            aria-labelledby={`question-${index}`}
            hidden={open !== index}
          >
            <p>{item.answer}</p>
          </div>
        </section>
      ))}
    </div>
  );
}
